import { CategoriesRepository } from './repositories/categories.respository';
import mongoose from 'mongoose';
import { Injectable } from '@nestjs/common';
import {
  CreateRestaurantInput,
  CreateRestaurantOutput,
} from '@/restaurants/dtos/create-restaurant.dto';
import { InjectModel } from '@nestjs/mongoose';
import {
  Restaurant,
  RestaurantDocument,
} from '@/restaurants/entities/restaurant.entity';
import { Model } from 'mongoose';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectModel(Restaurant.name)
    private readonly restaurantsModel: Model<RestaurantDocument>,
    private readonly categoriesRepository: CategoriesRepository,
  ) {}

  async createRestaurant(
    createRestaurantDto: CreateRestaurantInput,
    ownerId: mongoose.Types.ObjectId,
  ): Promise<CreateRestaurantOutput> {
    const { categoryName } = createRestaurantDto;
    const restaurant = new this.restaurantsModel(createRestaurantDto);
    const category = await this.categoriesRepository.getOrCreate(categoryName);

    restaurant.owner = ownerId;
    restaurant.category = category._id as mongoose.Types.ObjectId;

    try {
      await restaurant.save();
      return {
        ok: true,
        restaurantId: restaurant._id,
      };
    } catch (error) {
      return {
        ok: false,
        error: "Couldn't create restaurant",
      };
    }
  }

  async findAllRestaurant() {
    return this.restaurantsModel.find().exec();
  }
}
