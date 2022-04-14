import { Field, ObjectType } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';

@ObjectType()
export class CoreEntity {
  @Field(type => ObjectId)
  _id: ObjectId;
  @Field(type => Date)
  createdAt: Date;
  @Field(type => Date)
  updatedAt: Date;
}
