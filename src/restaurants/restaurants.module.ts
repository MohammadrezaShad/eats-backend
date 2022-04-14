import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsResolver } from './restaurants.resolver';
import {
  Restaurant,
  RestaurantSchema,
} from '@/restaurants/entities/restaurant.entity';
import { RestaurantsRepository } from '@/restaurants/restaurants.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Restaurant.name, schema: RestaurantSchema },
    ]),
  ],
  providers: [RestaurantsResolver, RestaurantsService, RestaurantsRepository],
})
export class RestaurantsModule {}