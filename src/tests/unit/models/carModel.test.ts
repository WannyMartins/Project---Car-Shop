// template para criação dos testes de cobertura da camada de model


import * as sinon from 'sinon';
import chai from 'chai';
import CarModel from '../../../models/CarModel';
import { Model } from 'mongoose';
import { carMock, carMockAllDb, carMockUpdate, carMockUpdateWithId, carMockWithId, idValido } from '../../mock/mockCar';
import { ErrorTypes } from '../../../errors/catalog';
const { expect } = chai;

describe('Car Model', () => {
  const carModel = new CarModel();

  before(async () => {
    sinon.stub(Model, 'create').resolves(carMockWithId);
    sinon.stub(Model, 'find').resolves([carMockAllDb]);
    sinon.stub(Model, 'findOne').resolves(carMockWithId);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(carMockUpdateWithId);
    sinon.stub(Model, 'findByIdAndDelete').resolves(carMockWithId);
  });

  after(()=>{
    sinon.restore();
  })

  describe('adicionando um novo carro', () => {
    it('criado com sucesso ', async () => {
      const car = await carModel.create(carMock);
      expect(car).to.be.deep.equal(carMockWithId)
    });
  })

  describe('buscando todos os carros', () => {
    it('busca realizada com sucesso ', async () => {
      const car = await carModel.read();
      expect(car).to.be.deep.equal([carMockAllDb])
    });
  })

  describe('buscando carro pelo Id', () => {
    it('busca realizada com sucesso ', async () => {
      const car = await carModel.readOne(idValido);
      expect(car).to.be.deep.equal(carMockWithId)
    });
    it('passando Id Inválido', async () => {
			try {
				await carModel.readOne('123ERRADO');
			} catch (error: any) {
				expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
			}
    });

  })

  describe('fazendo update de um carro', () => {
    it('update realizado com sucesso ', async () => {
      const car = await carModel.update(idValido, carMockUpdate);
      expect(car).to.be.deep.equal(carMockUpdateWithId)
    });
    it('passando Id Inválido', async () => {
			try {
				await carModel.update('123ERRADO', carMockUpdate);
			} catch (error: any) {
				expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
			}
    });

  })

  describe('deletando um carro pelo id', () => {
    it('deletado com sucesso ', async () => {
      const car = await carModel.delete(idValido);
      expect(car).to.be.deep.equal(carMockWithId)
    });
    it('passando Id Inválido', async () => {
			try {
				await carModel.delete('123ERRADO');
			} catch (error: any) {
				expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
			}
    });

  })





});