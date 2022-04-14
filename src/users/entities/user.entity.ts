import { Document } from '@/common/types/document.type';
import { CoreEntity } from '@/common/entities/core.entity';
import { Schema } from '@/common/decorators/schema.decorator';
import {
  ObjectType,
  Field,
  InputType,
  registerEnumType,
} from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { SchemaFactory } from '@/common/utils/schema-factory.util';
import { UserRole } from '@/common/enums/user-role.enum';
import * as bcrypt from 'bcrypt';
import { IsEmail, IsEnum, IsString } from 'class-validator';
import * as jwt from 'jsonwebtoken';

registerEnumType(UserRole, {
  name: 'UserRole',
});

@InputType({ isAbstract: true })
@ObjectType()
@Schema()
export class User extends CoreEntity {
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  @Field(type => String)
  @IsEmail()
  email: string;

  @Prop({
    type: String,
    required: true,
  })
  @Field(type => String)
  @IsString()
  password: string;

  @Prop({
    type: String,
    enum: [...Object.values(UserRole)],
    required: true,
  })
  @Field(type => UserRole)
  @IsEnum(UserRole)
  role: UserRole;

  validatePassword: (password: string) => Promise<boolean>;
  generateToken: () => Promise<string>;
}

export type UserDocument = Document<User>;
export const UserSchema = SchemaFactory(User);

UserSchema.pre('save', async function (next) {
  const user = this as UserDocument;
  if (!user.isModified('password')) return next();
  try {
    user.password = await bcrypt.hash(user.password, 10);
    return next();
  } catch (e) {
    return next(e);
  }
});

UserSchema.methods.validatePassword = async function validatePassword(data) {
  return bcrypt.compare(data, this.password);
};

UserSchema.methods.generateToken = async function generateToken() {
  const user = this as UserDocument;
  const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
  return token;
};
