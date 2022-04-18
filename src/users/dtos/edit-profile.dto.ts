import { CoreOutput } from '@/common/dtos/output.dto';
import { User } from '@/users/entities/user.entity';
import { InputType, ObjectType, PartialType, PickType } from '@nestjs/graphql';

@ObjectType()
export class EditProfileOutput extends CoreOutput {}

@InputType()
export class EditProfileInput extends PartialType(
  PickType(User, ['email', 'password']),
) {}
