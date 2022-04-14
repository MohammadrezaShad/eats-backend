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
  })
  @Field(type => String)
  email: string;

  @Prop({
    type: String,
    required: true,
  })
  @Field(type => String)
  password: string;

  @Prop({
    type: String,
    enum: [...Object.values(UserRole)],
    default: UserRole.CLIENT,
  })
  @Field(type => UserRole)
  role: UserRole;
}

export type UserDocument = Document<User>;
export const UserSchema = SchemaFactory(User);
