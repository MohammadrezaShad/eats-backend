import { CoreOutput } from '@/common/dtos/output.dto';
import { User } from '@/users/entities/user.entity';
import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';

@InputType()
export class LoginInput extends PickType(User, ['email', 'password']) {}

@ObjectType()
export class LoginOutput extends CoreOutput {
  @Field(type => String, { nullable: true })
  token?: string;
}
