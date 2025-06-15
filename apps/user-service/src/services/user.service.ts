import { InsertUser } from '@/models/user.model';
import { UserRepository } from '@/repositories/user.repository';
import { verifyPassword } from '@/utils/password';
import { HTTP_STATUS_CODES } from '@repo/shared-server/core';
import { normalizeUser, ServiceResponse } from '@repo/shared-server/lib';
import { User } from '@repo/types/user';
import type { Request } from 'express';

export class UserService {
  private userRepository: UserRepository;

  constructor(repository: UserRepository = new UserRepository()) {
    this.userRepository = repository;
  }

  public async createUser(data: InsertUser) {
    const user = await this.userRepository.createUser({
      email: data.email,
      password: data.password!,
      name: data.name,
      role: data.role!,
    });

    return ServiceResponse.success('User created successfully', user, HTTP_STATUS_CODES.CREATED);
  }

  public async getMe(req: Request) {
    const user = req.user;
    return ServiceResponse.success('User fetched successfully', user, HTTP_STATUS_CODES.OK);
  }

  public async getUserByEmail(email: string) {
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) {
      return ServiceResponse.failure('User not found', null, HTTP_STATUS_CODES.NOT_FOUND);
    }
    return ServiceResponse.success('User fetched successfully', normalizeUser(user as User), HTTP_STATUS_CODES.OK);
  }

  public async getUserById(id: string) {
    const user = await this.userRepository.getUserById(id);
    if (!user) {
      return ServiceResponse.failure('User not found', null, HTTP_STATUS_CODES.NOT_FOUND);
    }
    const { password, ...userWithoutPassword } = user;
    return ServiceResponse.success('User fetched successfully', userWithoutPassword, HTTP_STATUS_CODES.OK);
  }

  public async verifyPassword(email: string, password: string) {
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) {
      return ServiceResponse.failure('User not found', null, HTTP_STATUS_CODES.NOT_FOUND);
    }

    if (!user.password) {
      return ServiceResponse.failure('User has no password set', null, HTTP_STATUS_CODES.BAD_REQUEST);
    }

    const isValid = await verifyPassword(user.password, password);
    return ServiceResponse.success('Password verification completed', { isValid }, HTTP_STATUS_CODES.OK);
  }
}

// Export a singleton instance for convenience
export const userService = new UserService();
