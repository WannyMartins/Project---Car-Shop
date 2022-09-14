import { carZodSchema, ICar } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';

export default class CarService implements IModel<ICar> {
  private _car: IModel<ICar>;

  constructor(model: IModel<ICar>) {
    this._car = model;
  }

  public async create(obj: ICar): Promise<ICar> {
    const parsed = carZodSchema.safeParse(obj);
    if (!parsed.success) throw parsed.error;

    return this._car.create(obj);
  }
}