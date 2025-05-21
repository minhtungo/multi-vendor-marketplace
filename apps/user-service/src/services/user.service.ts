import { InsertUser } from '@/db/schemas';
import { UserRepository } from '@/repositories/user.repository';
import { HTTP_STATUS_CODES } from '@repo/server/core';
import { ServiceResponse } from '@repo/server/lib';
import type { Request } from 'express';
import { verifyPassword } from '@/utils/password';

export class UserService {
  private userRepository: UserRepository;

  constructor(repository: UserRepository = new UserRepository()) {
    this.userRepository = repository;
  }

  public async createUser(data: InsertUser) {
    console.log('createUser', data);
    const user = await this.userRepository.createUser(data);
    console.log('after createUser', user);
    return ServiceResponse.success('User created successfully', user, HTTP_STATUS_CODES.CREATED);
  }

  public async getMe(req: Request) {
    const user = req.user;
    return ServiceResponse.success('User fetched successfully', user, HTTP_STATUS_CODES.OK);
  }

  public async getUserByEmail(email: string) {
    console.log('email getUserByEmail', email);
    const user = await this.userRepository.getUserByEmail(email);
    console.log('after getUserByEmail', user);
    if (!user) {
      return ServiceResponse.failure('User not found', null, HTTP_STATUS_CODES.NOT_FOUND);
    }
    return ServiceResponse.success('User fetched successfully', user, HTTP_STATUS_CODES.OK);
  }

  public async getUserById(id: string) {
    const user = await this.userRepository.getUserById(id);
    if (!user) {
      return ServiceResponse.failure('User not found', null, HTTP_STATUS_CODES.NOT_FOUND);
    }
    return ServiceResponse.success('User fetched successfully', user, HTTP_STATUS_CODES.OK);
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
