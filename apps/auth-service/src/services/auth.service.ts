import { ServiceResponse } from '@/lib/service-response';
import { SignUpInput } from '@/models/auth.model';
import { TokenRepository } from '@/repositories/token.repository';
import { UserRepository } from '@/repositories/user.repository';
import { createTransaction } from '@/utils/transaction';
import { logger } from '@packages/utils/logger';
import { StatusCodes } from 'http-status-codes';

export class AuthService {
  private userRepository: UserRepository;
  private tokenRepository: TokenRepository;

  constructor(
    userRepo: UserRepository = new UserRepository(),
    tokenRepo: TokenRepository = new TokenRepository()
  ) {
    this.userRepository = userRepo;
    this.tokenRepository = tokenRepo;
  }

  async signUp(data: SignUpInput): Promise<ServiceResponse> {
    try {
      const existingUser = await this.userRepository.getUserByEmail(data.email);

      if (existingUser) {
        if (existingUser.emailVerified) {
          return ServiceResponse.success(
            'If your email is not registered, you will receive a verification email shortly',
            null,
            StatusCodes.OK
          );
        }

        const existingToken =
          await this.tokenRepository.getVerificationTokenByUserId(
            existingUser.id
          );

        if (existingToken && existingToken.expires < new Date()) {
          await createTransaction(async (trx) => {
            // Delete old token
            await this.tokenRepository.deleteVerificationTokenByToken(
              existingToken.token,
              trx
            );

            // Create new token
            const newToken =
              await this.tokenRepository.createVerificationEmailToken(
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
        const newUser = await this.userRepository.createUser(data, trx);

        const verificationToken =
          await this.tokenRepository.createVerificationEmailToken(
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
