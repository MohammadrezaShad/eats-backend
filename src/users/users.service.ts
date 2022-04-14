import { CreateAccountInput } from '@/users/dtos/create-user.dto';
import { User, UserDocument } from '@/users/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly usersModel: Model<UserDocument>,
  ) {}

  async createAccount(
    createAccountInput: CreateAccountInput,
  ): Promise<UserDocument> {
    const createdUser = new this.usersModel(createAccountInput);
    return await createdUser.save();
  }
}
