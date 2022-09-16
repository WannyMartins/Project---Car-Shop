import { Request, Response } from 'express';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import { IService } from '../interfaces/IService';

export default class MotorcycleController {
  constructor(private _service: IService<IMotorcycle>) { }

  public async create(req: Request & { body: IMotorcycle }, res: Response<IMotorcycle>) {
    const { status, model, year, color, buyValue, category, engineCapacity } = req.body;
    const motorcycle = { status, model, year, color, buyValue, category, engineCapacity };
    const results = await this._service.create(motorcycle);
    return res.status(201).json(results);
  }

  public async read(req: Request, res: Response<IMotorcycle[]>) {
    const results = await this._service.read();
    return res.status(200).json(results);
  }

  // public async readOne(req: Request, res: Response<IMotorcycle>) {
  //   const { id } = req.params;
  //   const results = await this._service.readOne(id);
  //   return res.status(200).json(results);
  // }

  // public async update(req: Request, res: Response<IMotorcycle>) {
  //   const { params, body } = req;
  //   await this._service.update(params.id, body);
  //   const result = await this._service.readOne(params.id);
    
  //   return res.status(200).json(result);
  // }

  // public async delete(req: Request, res: Response<IMotorcycle>) {
  //   const { id } = req.params;
  //   await this._service.delete(id);
  //   return res.sendStatus(204);
  // }
}