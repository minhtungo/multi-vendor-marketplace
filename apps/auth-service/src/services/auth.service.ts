import { env } from '@/configs/env';
import { tokenConfig } from '@/configs/token';
import { ServiceResponse } from '@/lib/service-response';
import { SignInInput, SignUpInput } from '@/models/auth.model';
import { TokenRepository } from '@/repositories/token.repository';
import { UserRepository } from '@/repositories/user.repository';
import { verifyPassword } from '@/utils/password';
import { generateAccessToken, generateRefreshToken } from '@/utils/token';
import { createTransaction } from '@/utils/transaction';
import { logger } from '@packages/utils/logger';
import { Response } from 'express';
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

  async signIn(data: SignInInput): Promise<{
    refreshToken: string;
    serviceResponse: ServiceResponse<{
      accessToken: string;
      convertedUser: { id: string };
    } | null>;
  }> {
    try {
      const user = await this.userRepository.getUserByEmail(data.email);

      if (!user || !user.emailVerified || !user.id || !user.password) {
        return {
          refreshToken: '',
          serviceResponse: ServiceResponse.failure(
            'Invalid credentials',
            null,
            StatusCodes.UNAUTHORIZED
          ),
        };
      }

      const isPasswordValid = await verifyPassword(
        user.password,
        data.password
      );

      if (!isPasswordValid) {
        return {
          refreshToken: '',
          serviceResponse: ServiceResponse.failure(
            'Invalid credentials',
            null,
            StatusCodes.UNAUTHORIZED
          ),
        };
      }

      const { token: refreshToken, sessionId } = await generateRefreshToken(
        user.id
      );

      const accessToken = generateAccessToken({
        sub: user.id,
        email: user.email,
        userId: user.id,
        sessionId,
      });

      return {
        refreshToken,
        serviceResponse: ServiceResponse.success(
          'Signed in successfully',
          {
            accessToken,
            convertedUser: {
              id: user.id,
            },
          },
          StatusCodes.OK
        ),
      };
    } catch (ex) {
      const errorMessage = `Error signing in: ${(ex as Error).message}`;
      logger.error(errorMessage);

      return {
        refreshToken: '',
        serviceResponse: ServiceResponse.failure(
          'An error occurred while signing in.',
          null,
          StatusCodes.INTERNAL_SERVER_ERROR
        ),
      };
    }
  }

  async forgotPassword(email: string): Promise<ServiceResponse> {
    try {
      const user = await this.userRepository.getUserByEmail(email);

      if (!user || !user.emailVerified || !user.id) {
        return ServiceResponse.success(
          'If a matching account is found, a password reset email will be sent to you shortly',
          null,
          StatusCodes.OK
        );
      }

      const resetPasswordToken =
        await this.tokenRepository.createResetPasswordToken(user.id);

      // await emailService.sendPasswordResetEmail(
      //   email,
      //   user.name!,
      //   resetPasswordToken
      // );

      return ServiceResponse.success(
        'If a matching account is found, a password reset email will be sent to you shortly',
        null,
        StatusCodes.OK
      );
    } catch (ex) {
      const errorMessage = `Error forgetting password: ${
        (ex as Error).message
      }`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        'An error occurred while forgetting password',
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  setRefreshTokenToCookie(res: Response, refreshToken: string) {
    res.cookie(tokenConfig.refreshToken.cookieName, refreshToken, {
      httpOnly: env.NODE_ENV === 'production',
      secure: env.NODE_ENV === 'production',
      expires: new Date(Date.now() + tokenConfig.refreshToken.maxAge),
      path: '/',
      sameSite: 'lax',
    });
  }
}

export const authService = new AuthService();
