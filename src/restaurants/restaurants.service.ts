import { RestaurantsRepository } from './restaurants.repository';
import { Injectable } from '@nestjs/common';
import { CreateRestaurantDto } from '@/restaurants/dtos/create-restaurant.dto';
import { UpdateRestaurantDto } from '@/restaurants/dtos/update-restaurant.dto';

@Injectable()
export class RestaurantsService {
  constructor(private readonly restaurantsReepository: RestaurantsRepository) {}

  async createRestaurant(createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantsReepository.create(createRestaurantDto);
  }

  async updateRestaurant(updateRestaurantDto: UpdateRestaurantDto) {
    return this.restaurantsReepository.update(updateRestaurantDto);
  }
}
