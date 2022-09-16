import { model as mongooseCreateModel, Schema } from 'mongoose';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import MongoModel from './MongoModel';

const MotoMongooseSchema = new Schema<IMotorcycle>(
  {
    status: Boolean,
    model: String,
    year: Number,
    color: String,
    buyValue: Number,
    category: String,
    engineCapacity: Number,
  }, 
  { versionKey: false },
);

export default class CarModel extends MongoModel<IMotorcycle> {
  constructor(model = mongooseCreateModel('MotorcycleModel', MotoMongooseSchema)) {
    super(model);
  }
}