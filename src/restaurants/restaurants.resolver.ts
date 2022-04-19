import { AuthGuard } from '@/auth/auth.guard';
import { Restaurant } from '@/restaurants/entities/restaurant.entity';
import { Query, Resolver, Mutation } from '@nestjs/graphql';
import { RestaurantsService } from './restaurants.service';
import { Args } from '@nestjs/graphql';
import {
  CreateRestaurantInput,
  CreateRestaurantOutput,
} from './dtos/create-restaurant.dto';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import * as fs from 'fs';
import { finished } from 'stream/promises';
import { join } from 'path';
import { AuthUser } from '@/auth/auth-user.decorator';
import { User } from '@/users/entities/user.entity';
import mongoose from 'mongoose';
import { UseGuards } from '@nestjs/common';
import { Role } from '@/auth/role.decorator';

@Resolver(of => Restaurant)
export class RestaurantsResolver {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Mutation(() => Boolean)
  async uploadFile(
    @Args({ name: 'file', type: () => GraphQLUpload })
    { createReadStream, filename }: FileUpload,
  ): Promise<boolean> {
    try {
      // Invoking the `createReadStream` will return a Readable Stream.
      // See https://nodejs.org/api/stream.html#stream_readable_streams
      const stream = createReadStream();

      // This is purely for demonstration purposes and will overwrite the
      // local-file-output.txt in the current working directory on EACH upload.
      const out = fs.createWriteStream(`${process.cwd()}/uploads/${filename}`);
      stream.pipe(out);
      await finished(out);
      return true;
    } catch (error) {
      console.log(error);
    }
  }

  @Mutation(() => Boolean)
  async uploadFiles(
    @Args({ name: 'files', type: () => [GraphQLUpload] })
    files: FileUpload[],
  ): Promise<boolean> {
    const virtualDirectory = process.env.VIRTUAL_DIRECTORY;
    const rootDirectory = `${process.cwd()}/public/uploads`;
    const directory = virtualDirectory || rootDirectory;
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, {
        recursive: true,
      });
    }

    try {
      files.forEach(async file => {
        const { createReadStream, filename } = await file;
        const stream = createReadStream();
        const out = fs.createWriteStream(
          `${directory}/${Date.now() + '-' + filename}`,
        );
        stream.pipe(out);
        await finished(out);
      });

      return true;
    } catch (error) {
      console.log(error);
    }
  }

  @Query(() => [Restaurant])
  async getRestaurants() {
    return this.restaurantsService.findAllRestaurant();
  }

  @UseGuards(AuthGuard)
  @Role(['OWNER'])
  @Mutation(returns => CreateRestaurantOutput)
  async createRestaurant(
    @Args('createRestaurantDto') createRestaurantDto: CreateRestaurantInput,
    @AuthUser() { _id }: User,
  ) {
    return this.restaurantsService.createRestaurant(
      createRestaurantDto,
      _id as mongoose.Types.ObjectId,
    );
  }
}
