import { Field, ObjectType, InputType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';
import { Schema } from '@/common/decorators/schema.decorator';
import { SchemaFactory } from '@/common/utils/schema-factory.util';
import { Document } from '@/common/types/document.type';
import { CoreEntity } from '@/common/entities/core.entity';

@InputType({ isAbstract: true })
@ObjectType()
@Schema()
export class Restaurant extends CoreEntity {
  @Field(type => String)
  @Prop()
  @IsString()
  @Length(3, 15)
  name: string;

  @Field(type => Boolean, { defaultValue: false })
  @Prop({ defaultValue: false })
  @IsOptional()
  @IsBoolean()
  isVegan: boolean;

  @Field(type => String)
  @Prop()
  @IsString()
  address: string;

  @Field(type => String)
  @Prop()
  @IsString()
  ownerName: string;

  @Field(type => String)
  @Prop()
  @IsString()
  categoryName: string;

  @Field(type => Date)
  createdAt: Date;

  @Field(type => Date)
  updatedAt: Date;
}

export const RestaurantSchema = SchemaFactory(Restaurant);
export type RestaurantDocument = Document<Restaurant>;
