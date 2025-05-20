import { InsertUser } from '@/db/schemas';
import { UserRepository } from '@/repositories/user.repository';
import { HTTP_STATUS_CODES } from '@repo/server/core';
import { ServiceResponse } from '@repo/server/lib';
import type { Request } from 'express';
export class UserService {
  private userRepository: UserRepository;

  constructor(repository: UserRepository = new UserRepository()) {
    this.userRepository = repository;
  }

  public async createUser(data: InsertUser) {
    const user = await this.userRepository.createUser(data);
    return ServiceResponse.success('User created successfully', user, HTTP_STATUS_CODES.CREATED);
  }

  public async getMe(req: Request) {
    const user = req.user;
    return ServiceResponse.success('User fetched successfully', user, HTTP_STATUS_CODES.OK);
  }
}

// Export a singleton instance for convenience
export const userService = new UserService();
