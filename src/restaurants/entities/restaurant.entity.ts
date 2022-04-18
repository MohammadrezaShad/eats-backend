import { Category } from './category.entity';
import { Field, ObjectType, InputType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { IsOptional, IsString, Length } from 'class-validator';
import { Schema } from '@/common/decorators/schema.decorator';
import { SchemaFactory } from '@/common/utils/schema-factory.util';
import { Document } from '@/common/types/document.type';
import { CoreEntity } from '@/common/entities/core.entity';
import mongoose from 'mongoose';
import { User } from '@/users/entities/user.entity';

@InputType('RestaurantInputType', { isAbstract: true })
@ObjectType('')
@Schema()
export class Restaurant extends CoreEntity {
  @Field(type => String)
  @Prop()
  @IsString()
  @Length(3, 15)
  name: string;

  @Field(type => String)
  @Prop()
  @IsString()
  address: string;

  @Field(type => String)
  @Prop()
  @IsString()
  coverImg: string;

  @Field(() => Category, { nullable: true })
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  })
  @IsString()
  @IsOptional()
  category: mongoose.Types.ObjectId;

  @Field(() => User)
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  @IsString()
  owner: mongoose.Types.ObjectId;
}

export const RestaurantSchema = SchemaFactory(Restaurant);
export type RestaurantDocument = Document<Restaurant>;
