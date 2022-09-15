// template para criação dos testes de cobertura da camada de model


import * as sinon from 'sinon';
import chai from 'chai';
import CarModel from '../../../models/CarModel';
import { carMock, carMockWithId } from '../../mock/mockCar';
import CarService from '../../../services/CarService';
import CarController from '../../../controllers/CarController';
import { Request, Response } from 'express';
const { expect } = chai;

describe('Car Model', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);
  const carController = new CarController(carService);

  const req = {} as Request;
  const res = {} as Response;
  
  before(async () => {
    sinon.stub(carService, 'create').resolves(carMockWithId);
    
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  
  });

  after(()=>{
    sinon.restore();
  })

  describe('adicionando um novo carro', () => {
    it('criado com sucesso ', async () => {
      req.body = carMock 
      const car = await carController.create(req, res);
      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be.true;
    });
  })

});