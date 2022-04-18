import {
  Verification,
  VerificationDocument,
} from './entities/verification.entity';
import { ObjectId } from 'mongodb';
import { JwtService } from './../jwt/jwt.service';
import { CreateAccountInput } from '@/users/dtos/create-account.dto';
import { LoginInput } from '@/users/dtos/login.dto';
import { User, UserDocument } from '@/users/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserProfileOutput } from '@/users/dtos/user-profile.dto';
import {
  EditProfileInput,
  EditProfileOutput,
} from '@/users/dtos/edit-profile.dto';
import { VerifyEmailOutput } from '@/users/dtos/verify-email.dto';
import { MailService } from '@/mail/mail.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly usersModel: Model<UserDocument>,
    @InjectModel(Verification.name)
    private readonly verificationModel: Model<VerificationDocument>,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async createAccount(
    createAccountInput: CreateAccountInput,
  ): Promise<{ ok: boolean; error?: string }> {
    const { email } = createAccountInput;
    try {
      const exist = await this.usersModel.findOne({ email }).count();
      if (exist) return { ok: false, error: 'Email already exists' };
      const user = new this.usersModel(createAccountInput);
      const verification = new this.verificationModel({ user: user._id });
      await verification.save();
      await user.save();
      this.mailService.sendVerificationEmail(user.email, verification.code);
      return { ok: true };
    } catch (e) {
      return { ok: false, error: "Can't create account" };
    }
  }

  async login(
    loginInput: LoginInput,
  ): Promise<{ ok: boolean; error?: string; token?: string }> {
    const { email, password } = loginInput;
    try {
      const user = await this.usersModel.findOne(
        { email },
        {
          _id: 1,
          password: 1,
        },
      );
      if (!user) return { ok: false, error: 'User not found' };

      const isValid = await user.validatePassword(password);

      if (!isValid) return { ok: false, error: 'Invalid password' };
      const token = await this.jwtService.sign(user._id);
      return { ok: true, token };
    } catch (e) {
      return { ok: false, error: "Can't log user in." };
    }
  }

  async findById(id: number): Promise<UserProfileOutput> {
    try {
      const user = await this.usersModel.findById(id);
      return {
        ok: true,
        user,
      };
    } catch (error) {
      return { ok: false, error: 'User Not Found' };
    }
  }

  async editProfile(
    userId: ObjectId,
    { email, password }: EditProfileInput,
  ): Promise<EditProfileOutput> {
    try {
      const user = await this.usersModel.findById(userId);
      if (email) {
        user.email = email;
        const verification = new this.verificationModel({ user: user._id });
        await verification.save();
        this.mailService.sendVerificationEmail(user.email, verification.code);
      }
      if (password) {
        user.password = password;
      }

      await user.save();
      return {
        ok: true,
      };
    } catch (error) {
      return { ok: false, error: 'Could not update profile.' };
    }
  }

  async verifyEmail(code: string): Promise<VerifyEmailOutput> {
    try {
      const verification = await this.verificationModel
        .findOne({
          code,
        })
        .populate('user');

      if (verification) {
        const user = verification.user as unknown as UserDocument;
        user.isVerified = true;
        await user.save();
        await this.verificationModel.findByIdAndDelete(verification.id);
        return { ok: true };
      }
      return { ok: false, error: 'Verification not found.' };
    } catch (error) {
      return { ok: false, error: 'Could not verify email.' };
    }
  }
}
