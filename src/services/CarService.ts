import { ErrorTypes } from '../errors/catalog';
import { carZodSchema, ICar } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import { IService } from '../interfaces/IService';

export default class CarService implements IService<ICar> {
  private _car: IModel<ICar>;

  constructor(model: IModel<ICar>) {
    this._car = model;
  }

  public async create(obj: ICar): Promise<ICar> {
    const parsed = carZodSchema.safeParse(obj);
    if (!parsed.success) throw parsed.error;

    const car = await this._car.create(obj);
    return car;
  }

  public async read(): Promise<ICar[]> {
    const car = await this._car.read();
    return car;
  }

  public async readOne(_id: string): Promise<ICar> {
    const car = await this._car.readOne(_id);
    if (!car) throw new Error(ErrorTypes.ObjectNotFound);
    return car;
  }

  public async update(_id: string, obj: ICar): Promise<ICar> {
    const parsed = carZodSchema.safeParse(obj);
    if (!parsed.success) throw parsed.error;

    const car = await this._car.update(_id, obj);
    if (!car) throw new Error(ErrorTypes.ObjectNotFound);
    return car;
  }

  public async delete(_id: string): Promise<ICar> {
    const car = await this._car.delete(_id);
    if (!car) { throw new Error(ErrorTypes.ObjectNotFound); }
    return car;
  }
}