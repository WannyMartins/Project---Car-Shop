// template para criação dos testes de cobertura da camada de model


import chai from 'chai';
import { Request, Response } from 'express';
import * as sinon from 'sinon';
import MotorcycleController from '../../../controllers/MotorcycleController';
import MotorcycleModel from '../../../models/MotorcycleModel';
import MotorcycleService from '../../../services/MotorcycleService';
import { motorcycleMock, motorcycleMockUpdate, motorcycleMockUpdateBefore, motorcycleMockUpdateWithId, motorcycleMockWithId } from '../../mock/mockMotorcycle';
const { expect } = chai;

describe('Motorcycle Controller', () => {
  const motorcycleModel = new MotorcycleModel();
  const motorcycleService = new MotorcycleService(motorcycleModel);
  const motorcycleController = new MotorcycleController(motorcycleService);

  const req = {} as Request;
  const res = {} as Response;
  
  before(async () => {
    sinon.stub(motorcycleService, 'create').resolves(motorcycleMockWithId);
    sinon.stub(motorcycleService, 'read').resolves([motorcycleMockWithId]);
    sinon.stub(motorcycleService, 'readOne').resolves(motorcycleMockWithId);
    sinon.stub(motorcycleService, 'update').resolves(motorcycleMockUpdateWithId);
    sinon.stub(motorcycleService, 'delete').resolves(motorcycleMockWithId);
    
    res.sendStatus = sinon.stub().returns(res);
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  
  });

  after(()=>{
    sinon.restore();
  })

  describe('adicionando uma nova moto', () => {
    it('criada com sucesso ', async () => {
      req.body = motorcycleMock 
      await motorcycleController.create(req, res);
      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motorcycleMockWithId)).to.be.true;
    });
  })

  describe('buscando por todas as motos do db', () => {
    it('busca realizada com sucesso', async () => {

      await motorcycleController.read(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith([motorcycleMockWithId])).to.be.true;
    });
  })

  describe('buscando um carro atraves do id', () => {
    it('busca realizada com sucesso', async () => {
      req.params = { id: motorcycleMockWithId._id}
      await motorcycleController.readOne(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motorcycleMockWithId)).to.be.true;
    });
  })

  describe('atualizando um carro atraves do id', () => {
    it('atualizado com sucesso', async () => {
      req.params = { id: motorcycleMockUpdateBefore._id}
      req.body = motorcycleMockUpdate
      await motorcycleController.update(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
    });
  })

  describe('deletando um carro atraves do id', () => {
    it('deletado com sucesso', async () => {
      req.params = { id: motorcycleMockWithId._id}
      await motorcycleController.delete(req, res);
      expect((res.sendStatus as sinon.SinonStub).calledWith(204)).to.be.true;
    });
  })




});