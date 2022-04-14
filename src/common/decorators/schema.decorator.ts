import { Schema as MongooseSchema, SchemaOptions } from '@nestjs/mongoose';

export const Schema = (options?: SchemaOptions) =>
  MongooseSchema({ timestamps: true, ...options });
