import * as sinon from 'sinon';
import chai from 'chai';
import MotorcycleModel from '../../../models/MotorcycleModel';
import { Model } from 'mongoose';
import { ErrorTypes } from '../../../errors/catalog';
import { idValido, motorcycleMock, motorcycleMockAllDb, motorcycleMockUpdate, motorcycleMockUpdateWithId, motorcycleMockWithId } from '../../mock/mockMotorcycle';
const { expect } = chai;

describe('Motorcycle Model', () => {
  const motorcycleModel = new MotorcycleModel();

  before(async () => {
    sinon.stub(Model, 'create').resolves(motorcycleMockWithId);
    sinon.stub(Model, 'find').resolves([motorcycleMockAllDb]);
    sinon.stub(Model, 'findOne').resolves(motorcycleMockWithId);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(motorcycleMockUpdateWithId);
    sinon.stub(Model, 'findByIdAndDelete').resolves(motorcycleMockWithId);
  });

  after(()=>{
    sinon.restore();
  })

  describe('adicionando uma nova moto', () => {
    it('criado com sucesso ', async () => {
      const motorcycle = await motorcycleModel.create(motorcycleMock);
      expect(motorcycle).to.be.deep.equal(motorcycleMockWithId)
    });
  })

  describe('buscando todas as motos', () => {
    it('busca realizada com sucesso ', async () => {
      const motorcycle = await motorcycleModel.read();
      expect(motorcycle).to.be.deep.equal([motorcycleMockAllDb])
    });
  })

  describe('buscando moto pelo Id', () => {
    it('busca realizada com sucesso ', async () => {
      const motorcycle = await motorcycleModel.readOne(idValido);
      expect(motorcycle).to.be.deep.equal(motorcycleMockWithId)
    });
    it('passando Id Inválido', async () => {
			try {
				await motorcycleModel.readOne('123ERRADO');
			} catch (error: any) {
				expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
			}
    });

  })

  describe('fazendo update de uma moto', () => {
    it('update realizado com sucesso ', async () => {
      const motorcycle = await motorcycleModel.update(idValido, motorcycleMockUpdate);
      expect(motorcycle).to.be.deep.equal(motorcycleMockUpdateWithId)
    });
    it('passando Id Inválido', async () => {
			try {
				await motorcycleModel.update('123ERRADO', motorcycleMockUpdate);
			} catch (error: any) {
				expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
			}
    });

  })

  describe('deletando uma moto pelo id', () => {
    it('deletado com sucesso ', async () => {
      const motorcycle = await motorcycleModel.delete(idValido);
      expect(motorcycle).to.be.deep.equal(motorcycleMockWithId)
    });
    it('passando Id Inválido', async () => {
			try {
				await motorcycleModel.delete('123ERRADO');
			} catch (error: any) {
				expect(error.message).to.be.eq(ErrorTypes.InvalidMongoId);
			}
    });

  })

});