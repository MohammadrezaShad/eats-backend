import { ObjectIdScalar } from './scalar/object-id.scalar';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsModule } from './cats/cats.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { UsersModule } from './users/users.module';
import { CommonModule } from './common/common.module';
import { JwtModule } from './jwt/jwt.module';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/config/.env.${
        process.env.NODE_ENV === 'dev' ? 'dev' : 'prod'
      }`,
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'prod').default('dev'),
        MONGO_URI: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
      }),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      installSubscriptionHandlers: true,
      playground: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    JwtModule.forRoot(),
    CommonModule,
    UsersModule,
  ],
  providers: [ObjectIdScalar],
})
export class AppModule {}
