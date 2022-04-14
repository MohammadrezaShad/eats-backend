import { type Document as MongoDocument } from 'mongoose';

export type Document<T> = MongoDocument & T;
