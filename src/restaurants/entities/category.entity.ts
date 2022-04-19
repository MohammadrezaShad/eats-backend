import { Field, ObjectType, InputType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';
import { Schema } from '@/common/decorators/schema.decorator';
import { SchemaFactory } from '@/common/utils/schema-factory.util';
import { Document } from '@/common/types/document.type';
import { CoreEntity } from '@/common/entities/core.entity';
import mongoose from 'mongoose';
import { Restaurant } from '@/restaurants/entities/restaurant.entity';

@InputType('CategoryInputType', { isAbstract: true })
@ObjectType()
@Schema()
export class Category extends CoreEntity {
  @Field(type => String)
  @Prop({
    required: true,
    unique: true,
  })
  @IsString()
  @Length(3, 15)
  name: string;

  @Field(type => String, { nullable: true })
  @Prop({
    required: false,
  })
  @IsString()
  coverImg: string;

  @Field(type => String)
  @Prop({
    required: true,
    unique: true,
  })
  @IsString()
  slug: string;

  @Field(type => [Restaurant])
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' }] })
  restaurants: mongoose.Types.ObjectId[];
}

export const CategorySchema = SchemaFactory(Category);
export type CategoryDocument = Document<Category>;
