import { Category, CategorySchema } from './entities/category.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsResolver } from './restaurants.resolver';
import {
  Restaurant,
  RestaurantSchema,
} from '@/restaurants/entities/restaurant.entity';
import { CategoriesRepository } from '@/restaurants/repositories/categories.respository';
import { UsersModule } from '@/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Restaurant.name, schema: RestaurantSchema },
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  providers: [RestaurantsResolver, RestaurantsService, CategoriesRepository],
})
export class RestaurantsModule {}
