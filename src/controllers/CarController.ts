import { Request, Response } from 'express';
import { ICar } from '../interfaces/ICar';
import { IService } from '../interfaces/IService';

export default class CarController {
  constructor(private _service: IService<ICar>) { }

  public async create(req: Request & { body: ICar }, res: Response<ICar>) {
    const { status, model, year, color, buyValue, doorsQty, seatsQty } = req.body;
    const car = { status, model, year, color, buyValue, doorsQty, seatsQty };
    const results = await this._service.create(car);
    return res.status(201).json(results);
  }

  public async read(req: Request, res: Response<ICar[]>) {
    const results = await this._service.read();
    return res.status(200).json(results);
  }

  public async readOne(req: Request, res: Response<ICar>) {
    const { id } = req.params;
    const results = await this._service.readOne(id);
    return res.status(200).json(results);
  }
}