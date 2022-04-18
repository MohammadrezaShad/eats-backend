import { CoreOutput } from '@/common/dtos/output.dto';
import { Restaurant } from '@/restaurants/entities/restaurant.entity';
import { PickType, InputType, ObjectType, Field } from '@nestjs/graphql';

@InputType()
export class CreateRestaurantInput extends PickType(Restaurant, [
  'name',
  'address',
  'coverImg',
] as const) {
  @Field(type => String)
  categoryName: string;
}

@ObjectType()
export class CreateRestaurantOutput extends CoreOutput {}
