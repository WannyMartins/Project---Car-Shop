import { ErrorTypes } from '../errors/catalog';
import { motoZodSchema, IMotorcycle } from '../interfaces/IMotorcycle';
import { IModel } from '../interfaces/IModel';
import { IService } from '../interfaces/IService';

export default class CarService implements IService<IMotorcycle> {
  private _motorcycle: IModel<IMotorcycle>;

  constructor(model: IModel<IMotorcycle>) {
    this._motorcycle = model;
  }

  public async create(obj: IMotorcycle): Promise<IMotorcycle> {
    const parsed = motoZodSchema.safeParse(obj);
    if (!parsed.success) throw parsed.error;

    const motorcycle = await this._motorcycle.create(obj);
    return motorcycle;
  }

  public async read(): Promise<IMotorcycle[]> {
    const motorcycle = await this._motorcycle.read();
    return motorcycle;
  }

  public async readOne(_id: string): Promise<IMotorcycle> {
    const motorcycle = await this._motorcycle.readOne(_id);
    if (!motorcycle) throw new Error(ErrorTypes.ObjectNotFound);
    return motorcycle;
  }

  public async update(_id: string, obj: IMotorcycle): Promise<IMotorcycle> {
    const parsed = motoZodSchema.safeParse(obj);
    if (!parsed.success) throw parsed.error;

    const motorcycle = await this._motorcycle.update(_id, obj);
    if (!motorcycle) throw new Error(ErrorTypes.ObjectNotFound);
    return motorcycle;
  }

  public async delete(_id: string): Promise<IMotorcycle> {
    const motorcycle = await this._motorcycle.delete(_id);
    if (!motorcycle) { throw new Error(ErrorTypes.ObjectNotFound); }
    return motorcycle;
  }
}