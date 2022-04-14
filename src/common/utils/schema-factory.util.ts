import { SchemaFactory as MongoSchemaFactory } from '@nestjs/mongoose';
import { Type } from '@nestjs/common';

export const SchemaFactory = <T>(target: Type<T>) =>
  MongoSchemaFactory.createForClass(target);
