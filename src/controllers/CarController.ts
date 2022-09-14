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
}