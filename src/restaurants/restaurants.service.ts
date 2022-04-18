import mongoose from 'mongoose';
import { RestaurantsRepository } from './restaurants.repository';
import { Injectable } from '@nestjs/common';
import { CreateRestaurantInput } from '@/restaurants/dtos/create-restaurant.dto';

@Injectable()
export class RestaurantsService {
  constructor(private readonly restaurantsReepository: RestaurantsRepository) {}

  async createRestaurant(
    createRestaurantDto: CreateRestaurantInput,
    ownerId: mongoose.Types.ObjectId,
  ) {
    try {
      await this.restaurantsReepository.create(createRestaurantDto, ownerId);
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: "Couldn't create restaurant",
      };
    }
  }

  async findAllRestaurant() {
    return this.restaurantsReepository.findAll();
  }
}
