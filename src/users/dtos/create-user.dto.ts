import { User } from '@/users/entities/user.entity';
import { InputType, PickType } from '@nestjs/graphql';

@InputType()
export class CreateAccountInput extends PickType(User, [
  'email',
  'password',
  'role',
]) {}
