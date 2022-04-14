import { JwtService } from './../jwt/jwt.service';
import { CreateAccountInput } from '@/users/dtos/create-account.dto';
import { LoginInput } from '@/users/dtos/login.dto';
import { User, UserDocument } from '@/users/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly usersModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async createAccount({
    email,
    password,
    role,
  }: CreateAccountInput): Promise<{ ok: boolean; error?: string }> {
    try {
      const exist = await this.usersModel.findOne({ email }).count();
      if (exist) return { ok: false, error: 'Email already exists' };
      const user = new this.usersModel({
        email,
        password,
        role,
      });
      await user.save();
      return { ok: true };
    } catch (e) {
      return { ok: false, error: "Can't create account" };
    }
  }

  async login({
    email,
    password,
  }: LoginInput): Promise<{ ok: boolean; error?: string; token?: string }> {
    try {
      const user = await this.usersModel.findOne({ email });
      if (!user) return { ok: false, error: 'User not found' };
      const isValid = await user.validatePassword(password);
      if (!isValid) return { ok: false, error: 'Invalid password' };
      const token = await user.generateToken();
      return { ok: true, token };
    } catch (e) {
      console.log(e);
      return { ok: false, error: e };
    }
  }
}
