import { CreateAccountOutput } from './dtos/create-account.dto';
import { CreateAccountInput } from '@/users/dtos/create-account.dto';
import { User } from '@/users/entities/user.entity';
import { Injectable, UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { LoginInput, LoginOutput } from '@/users/dtos/login.dto';
import { AuthUser } from '@/auth/auth-user.decorator';
import { AuthGuard } from '@/auth/auth.guard';
import {
  UserProfileInput,
  UserProfileOutput,
} from '@/users/dtos/user-profile.dto';
import {
  EditProfileInput,
  EditProfileOutput,
} from '@/users/dtos/edit-profile.dto';
import {
  VerifyEmailInput,
  VerifyEmailOutput,
} from '@/users/dtos/verify-email.dto';

@Resolver(of => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Query(returns => User)
  async getUser(@AuthUser() user: User): Promise<User> {
    return user;
  }

  @UseGuards(AuthGuard)
  @Query(returns => UserProfileOutput)
  async userProfile(
    @Args() userProfileInput: UserProfileInput,
  ): Promise<UserProfileOutput> {
    return this.usersService.findById(userProfileInput.userId);
  }

  @Mutation(returns => CreateAccountOutput)
  createAccount(
    @Args('createAccountInput') createAccountInput: CreateAccountInput,
  ): Promise<CreateAccountOutput> {
    return this.usersService.createAccount(createAccountInput);
  }

  @Mutation(returns => LoginOutput)
  login(@Args('loginInput') loginInput: LoginInput): Promise<LoginOutput> {
    return this.usersService.login(loginInput);
  }

  @UseGuards(AuthGuard)
  @Mutation(returns => EditProfileOutput)
  async editProfile(
    @AuthUser() authUser: User,
    @Args('input') editProfileInput: EditProfileInput,
  ): Promise<EditProfileOutput> {
    return this.usersService.editProfile(authUser._id, editProfileInput);
  }

  @Mutation(returns => VerifyEmailOutput)
  verifyEmail(
    @Args('input') { code }: VerifyEmailInput,
  ): Promise<VerifyEmailOutput> {
    return this.usersService.verifyEmail(code);
  }
}
