import { CreateAccountInput } from '@/users/dtos/create-user.dto';
import { User } from '@/users/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';

@Resolver(of => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(returns => User)
  async getUser() {
    return true;
  }

  @Mutation(returns => User)
  async createAccount(
    @Args('createAccountInput') createAccountInput: CreateAccountInput,
  ) {
    try {
      return await this.usersService.createAccount(createAccountInput);
    } catch (error) {
      console.log(error);
    }
  }
}
