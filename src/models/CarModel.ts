import { model as mongooseCreateModel, Schema } from 'mongoose';
import { ICar } from '../interfaces/ICar';
import MongoModel from './MongoModel';

const carMongooseSchema = new Schema<ICar>({
  status: Boolean,
  model: String,
  year: Number,
  color: String,
  buyValue: Number,
  doorsQty: Number,
  seatsQty: Number }, { versionKey: false });

export default class CarModel extends MongoModel<ICar> {
  constructor(model = mongooseCreateModel('CarModel', carMongooseSchema)) {
    super(model);
  }
}
