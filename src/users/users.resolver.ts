import { CreateAccountOutput } from './dtos/create-account.dto';
import { CreateAccountInput } from '@/users/dtos/create-account.dto';
import { User } from '@/users/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { LoginInput, LoginOutput } from '@/users/dtos/login.dto';

@Resolver(of => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(returns => User)
  async getUser() {
    return true;
  }

  @Mutation(returns => CreateAccountOutput)
  async createAccount(
    @Args('createAccountInput') createAccountInput: CreateAccountInput,
  ) {
    try {
      return await this.usersService.createAccount(createAccountInput);
    } catch (error) {
      return { ok: false, error };
    }
  }

  @Mutation(returns => LoginOutput)
  async login(@Args('loginInput') loginInput: LoginInput) {
    try {
      return await this.usersService.login(loginInput);
    } catch (error) {
      return { ok: false, error };
    }
  }
}
