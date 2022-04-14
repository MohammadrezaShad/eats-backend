import { CreateRestaurantDto } from '@/restaurants/dtos/create-restaurant.dto';
import { Restaurant } from '@/restaurants/entities/restaurant.entity';
import { OmitType, InputType, PartialType, Field } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';
import { ObjectId } from 'mongodb';

@InputType()
export class UpdateRestaurantInputType extends PartialType(
  CreateRestaurantDto,
) {}

@InputType()
export class UpdateRestaurantDto {
  @Field(type => ObjectId)
  _id: ObjectId;

  @Field(type => UpdateRestaurantInputType)
  data: UpdateRestaurantDto;
}
