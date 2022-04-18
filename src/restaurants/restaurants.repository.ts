import {
  Restaurant,
  RestaurantDocument,
} from '@/restaurants/entities/restaurant.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateRestaurantInput } from '@/restaurants/dtos/create-restaurant.dto';
import mongoose from 'mongoose';

export class RestaurantsRepository {
  constructor(
    @InjectModel(Restaurant.name)
    private readonly restaurantsModel: Model<RestaurantDocument>,
  ) {}

  create(
    createRestaurantDto: CreateRestaurantInput,
    ownerId: mongoose.Types.ObjectId,
  ) {
    const restaurant = new this.restaurantsModel(createRestaurantDto);
    restaurant.owner = ownerId;
    return restaurant.save();
  }

  findAll() {
    return this.restaurantsModel.find().exec();
  }
}
