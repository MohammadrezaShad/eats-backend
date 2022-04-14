import { Restaurant } from '@/restaurants/entities/restaurant.entity';
import { OmitType, InputType } from '@nestjs/graphql';

@InputType()
export class CreateRestaurantDto extends OmitType(Restaurant, [
  '_id',
  'createdAt',
  'updatedAt',
] as const) {}
{
}
