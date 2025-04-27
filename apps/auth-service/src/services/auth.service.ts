import { env } from '@/configs/env';
import { tokenConfig } from '@/configs/token';
import { ServiceResponse } from '@/lib/service-response';
import { SignInInput, SignUpInput } from '@/models/auth.model';
import { TokenRepository } from '@/repositories/token.repository';
import { UserRepository } from '@/repositories/user.repository';
import { RefreshTokenPayload } from '@/types/token';
import { verifyPassword } from '@/utils/password';
import { generateAccessToken, generateRefreshToken } from '@/utils/token';
import { createTransaction } from '@/utils/transaction';
import { logger } from '@packages/utils/logger';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { verify } from 'jsonwebtoken';

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

  async resetPassword(
    token: string,
    password: string
  ): Promise<ServiceResponse> {
    try {
      const existingToken =
        await this.tokenRepository.getResetPasswordTokenByToken(token);

      if (!existingToken || existingToken.expires < new Date()) {
        return ServiceResponse.failure(
          'Invalid token',
          null,
          StatusCodes.BAD_REQUEST
        );
      }

      await createTransaction(async (trx) => {
        await this.userRepository.updateUserPassword(
          existingToken.userId,
          password,
          trx
        );
        await this.tokenRepository.deleteResetPasswordTokenByToken(token, trx);
      });

      return ServiceResponse.success(
        'Password reset successfully',
        null,
        StatusCodes.OK
      );
    } catch (ex) {
      const errorMessage = `Error resetting password: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        'An error occurred while resetting password',
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async refreshToken(refreshToken: string): Promise<{
    refreshToken: string;
    serviceResponse: ServiceResponse<{
      accessToken: string;
      userId: string;
    } | null>;
  }> {
    if (!refreshToken) {
      return {
        refreshToken: '',
        serviceResponse: ServiceResponse.failure(
          'Refresh token not found',
          null,
          StatusCodes.UNAUTHORIZED
        ),
      };
    }
    try {
      const payload = verify(
        refreshToken,
        tokenConfig.refreshToken.secret
      ) as RefreshTokenPayload;

      // const isBlacklisted = await this.tokenRepository.isTokenBlacklisted(
      //   payload.sessionId
      // );

      if (isBlacklisted) {
        return {
          refreshToken: '',
          serviceResponse: ServiceResponse.failure(
            'Token has been revoked',
            null,
            StatusCodes.UNAUTHORIZED
          ),
        };
      }

      const user = await this.userRepository.getUserById(payload.sub);

      if (!user) {
        return {
          refreshToken: '',
          serviceResponse: ServiceResponse.failure(
            'User not found',
            null,
            StatusCodes.UNAUTHORIZED
          ),
        };
      }
      const { token: newRefreshToken, sessionId } = await generateRefreshToken(
        user.id
      );

      const accessToken = generateAccessToken({
        sub: user.id,
        email: user.email,
        userId: user.id,
        sessionId,
      });

      // Blacklist the old session
      // await this.tokenRepository.addTokenToBlacklist(
      //   payload.sessionId,
      //   tokenConfig.refreshToken.maxAge
      // );

      return {
        refreshToken: newRefreshToken,
        serviceResponse: ServiceResponse.success(
          'Token refreshed',
          { accessToken, userId: user.id },
          StatusCodes.OK
        ),
      };
    } catch (ex) {
      const errorMessage = `Error refreshing token: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return {
        refreshToken: '',
        serviceResponse: ServiceResponse.failure(
          'Invalid refresh token',
          null,
          StatusCodes.UNAUTHORIZED
        ),
      };
    }
  }

  async verifyEmail(token: string): Promise<ServiceResponse> {
    try {
      const existingToken =
        await this.tokenRepository.getVerificationTokenByToken(token);

      if (!existingToken || existingToken.expires < new Date()) {
        return ServiceResponse.failure(
          'Invalid token',
          null,
          StatusCodes.BAD_REQUEST
        );
      }

      await createTransaction(async (trx) => {
        await this.userRepository.updateUserEmailVerified(
          existingToken.userId,
          trx
        );
        await this.tokenRepository.deleteVerificationTokenByToken(token, trx);
      });

      return ServiceResponse.success('Email verified', null, StatusCodes.OK);
    } catch (ex) {
      const errorMessage = `Error verifying email: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        'An error occurred while verifying email',
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

  async signOut(refreshToken: string): Promise<ServiceResponse> {
    try {
      const payload = verify(
        refreshToken,
        tokenConfig.refreshToken.secret
      ) as RefreshTokenPayload;
      // await this.tokenRepository.addTokenToBlacklist(
      //   payload.sessionId,
      //   tokenConfig.refreshToken.maxAge
      // );
      return ServiceResponse.success(
        'Signed out successfully',
        null,
        StatusCodes.OK
      );
    } catch (ex) {
      const errorMessage = `Error signing out: ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        'An error occurred while signing out.',
        null,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

export const authService = new AuthService();
