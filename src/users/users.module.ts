import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { UserSchema, User } from './entities/user.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { Global, Module } from '@nestjs/common';
import {
  Verification,
  VerificationSchema,
} from '@/users/entities/verification.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Verification.name, schema: VerificationSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
@Global()
export class UsersModule {}
