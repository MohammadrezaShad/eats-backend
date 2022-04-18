import { Schema } from '@/common/decorators/schema.decorator';
import { v4 as uuidv4 } from 'uuid';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from '@/common/entities/core.entity';
import { Prop } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { SchemaFactory } from '@/common/utils/schema-factory.util';
import { Document } from '@/common/types/document.type';
import { User } from '@/users/entities/user.entity';
import mongoose, { Types } from 'mongoose';

@InputType('VerificationInputType', { isAbstract: true })
@ObjectType()
@Schema()
export class Verification extends CoreEntity {
  @Prop()
  @Field(type => String)
  code: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  user: Types.ObjectId;
}

export type VerificationDocument = Document<Verification>;
export const VerificationSchema = SchemaFactory(Verification);

VerificationSchema.pre('save', async function (next) {
  const verification = this as VerificationDocument;
  try {
    verification.code = uuidv4();
    return next();
  } catch (e) {
    return next(e);
  }
});
