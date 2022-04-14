import { Restaurant } from '@/restaurants/entities/restaurant.entity';
import { Query, Resolver, Mutation } from '@nestjs/graphql';
import { RestaurantsService } from './restaurants.service';
import { Args } from '@nestjs/graphql';
import { CreateRestaurantDto } from './dtos/create-restaurant.dto';
import { UpdateRestaurantDto } from '@/restaurants/dtos/update-restaurant.dto';

@Resolver(of => Restaurant)
export class RestaurantsResolver {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Query(returns => Restaurant)
  myResaurant() {
    return true;
  }

  @Mutation(returns => Restaurant)
  async createRestaurant(
    @Args('createRestaurantDto') createRestaurantDto: CreateRestaurantDto,
  ) {
    try {
      return await this.restaurantsService.createRestaurant(
        createRestaurantDto,
      );
    } catch (error) {
      console.log(error);
    }
  }

  @Mutation(returns => Restaurant)
  async updateRestaurant(
    @Args('updateRestaurantDto') updateRestaurantDto: UpdateRestaurantDto,
  ) {
    try {
      return await this.restaurantsService.updateRestaurant(
        updateRestaurantDto,
      );
    } catch (error) {
      console.log(error);
    }
  }
}
