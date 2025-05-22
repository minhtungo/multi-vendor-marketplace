import { tokenRepository } from '@/repositories/token.repository';
import { HTTP_STATUS_CODES } from '@repo/server/core';
import { ServiceResponse } from '@repo/server/lib';

export class TokenService {
  async verifyResetPasswordToken(token: string) {
    const existingToken = await tokenRepository.getResetPasswordTokenByToken(token);

    if (!existingToken || existingToken.expires < new Date()) {
      return ServiceResponse.failure('Invalid or expired token', null, HTTP_STATUS_CODES.BAD_REQUEST);
    }

    return ServiceResponse.success('Token is valid', null, HTTP_STATUS_CODES.OK);
  }
}

export const tokenService = new TokenService();
