import {
  Restaurant,
  RestaurantDocument,
} from '@/restaurants/entities/restaurant.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateRestaurantDto } from '@/restaurants/dtos/create-restaurant.dto';
import { UpdateRestaurantDto } from '@/restaurants/dtos/update-restaurant.dto';

export class RestaurantsRepository {
  constructor(
    @InjectModel(Restaurant.name)
    private readonly restaurantsModel: Model<RestaurantDocument>,
  ) {}

  create(createRestaurantDto: CreateRestaurantDto) {
    const restaurant = new this.restaurantsModel(createRestaurantDto);
    return restaurant.save();
  }

  update(updateRestaurantDto: UpdateRestaurantDto) {
    const { _id, data } = updateRestaurantDto;
    return this.restaurantsModel.findByIdAndUpdate({ _id }, data, {
      new: true,
    });
  }
}
