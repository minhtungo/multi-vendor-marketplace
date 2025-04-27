import { ServiceResponse } from '@/lib/service-response';
import { SignUpSchema } from '@/modules/auth-model';
import { AuthRepository } from '@/modules/auth-repository';
import { createTransaction } from '@/utils/transaction';
import { logger } from '@packages/utils/logger';
import { StatusCodes } from 'http-status-codes';

export class AuthService {
  private authRepository: AuthRepository;

  constructor(repository: AuthRepository = new AuthRepository()) {
    this.authRepository = repository;
  }

  async signUp(data: SignUpSchema): Promise<ServiceResponse> {
    try {
      const existingUser = await this.authRepository.getUserByEmail(data.email);

      if (existingUser) {
        if (existingUser.emailVerified) {
          return ServiceResponse.success(
            'If your email is not registered, you will receive a verification email shortly',
            null,
            StatusCodes.OK
          );
        }

        const existingToken =
          await this.authRepository.getVerificationTokenByUserId(
            existingUser.id
          );

        if (existingToken && existingToken.expires < new Date()) {
          await createTransaction(async (trx) => {
            // Delete old token
            await this.authRepository.deleteVerificationTokenByToken(
              existingToken.token,
              trx
            );

            // Create new token
            const newToken =
              await this.authRepository.createVerificationEmailToken(
                existingUser.id,
                trx
              );

            // await emailService.sendVerificationEmail(
            //   email,
            //   existingUser.name!,
            //   newToken
            // );

            return ServiceResponse.success(
              'If your email is not registered, you will receive a verification email shortly',
              null,
              StatusCodes.OK
            );
          });
        }
      }

      await createTransaction(async (trx) => {
        const newUser = await this.authRepository.createUser(data, trx);

        const verificationToken =
          await this.authRepository.createVerificationEmailToken(
            newUser.id,
            trx
          );

        // await emailService.sendVerificationEmail(
        //   email,
        //   newUser.name!,
        //   verificationToken
        // );
      });

      return ServiceResponse.success(
        'If your email is not registered, you will receive a verification email shortly',
        null,
        StatusCodes.OK
      );
    } catch (ex) {
      const errorMessage = `Error signing up: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        'An error occurred while signing up.',
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

export const authService = new AuthService();
