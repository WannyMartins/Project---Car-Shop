// template para criação dos testes de cobertura da camada de model


import chai from 'chai';
import { Request, Response } from 'express';
import * as sinon from 'sinon';
import CarController from '../../../controllers/CarController';
import CarModel from '../../../models/CarModel';
import CarService from '../../../services/CarService';
import { carMock, carMockUpdate, carMockUpdateBefore, carMockUpdateWithId, carMockWithId, idValido } from '../../mock/mockCar';
const { expect } = chai;

describe('Car Model', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);
  const carController = new CarController(carService);

  const req = {} as Request;
  const res = {} as Response;
  
  before(async () => {
    sinon.stub(carService, 'create').resolves(carMockWithId);
    sinon.stub(carService, 'read').resolves([carMockWithId]);
    sinon.stub(carService, 'readOne').resolves(carMockWithId);
    sinon.stub(carService, 'update').resolves(carMockUpdateWithId);
    sinon.stub(carService, 'delete').resolves(carMockWithId);
    
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  
  });

  after(()=>{
    sinon.restore();
  })

  describe('adicionando um novo carro', () => {
    it('criado com sucesso ', async () => {
      req.body = carMock 
      await carController.create(req, res);
      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be.true;
    });
  })

  describe('buscando por todos os carros do db', () => {
    it('busca realizada com sucesso', async () => {

      await carController.read(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith([carMockWithId])).to.be.true;
    });
  })

  describe('buscando um carro atraves do id', () => {
    it('busca realizada com sucesso', async () => {
      req.params = { id: carMockWithId._id}
      await carController.readOne(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be.true;
    });
  })

  describe('atualizando um carro atraves do id', () => {
    it('atualizado com sucesso', async () => {
      req.params = { id: carMockUpdateBefore._id}
      req.body = carMockUpdate
      await carController.update(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
    });
  })

  describe('deletando um carro atraves do id', () => {
    it('deletado com sucesso', async () => {
      req.params = { id: carMockWithId._id}
      await carController.delete(req, res);
      expect((res.status as sinon.SinonStub).calledWith(204)).to.be.true;
    });
  })




});