import chai from 'chai';
import * as sinon from 'sinon';
import MotorcycleModel from '../../../models/MotorcycleModel';
import MotorcycleService from '../../../services/MotorcycleService';
import { motorcycleMock, motorcycleMockUpdate, motorcycleMockUpdateBefore, motorcycleMockUpdateInvalido, motorcycleMockUpdateWithId, motorcycleMockWithId } from '../../mock/mockMotorcycle';
const { expect } = chai;
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';
import { idValido } from '../../mock/mockMotorcycle';

describe('motorcycle Services', () => {
  const motorcycleModel = new MotorcycleModel();
  const motorcycleService = new MotorcycleService(motorcycleModel);

  before(async () => {
    sinon.stub(motorcycleModel, 'create').resolves(motorcycleMockWithId);
    sinon.stub(motorcycleModel, 'read').resolves([motorcycleMockWithId]);
    sinon.stub(motorcycleModel, 'readOne')
      .onCall(0).resolves(motorcycleMockWithId)
      .onCall(1).resolves(null);
    sinon.stub(motorcycleModel, 'update')
      .onCall(0).resolves(motorcycleMockUpdateWithId)
      .onCall(1).resolves(null)
      .onCall(2).resolves(motorcycleMockUpdateWithId)
      .onCall(3).resolves(motorcycleMockUpdateWithId);

    sinon.stub(motorcycleModel, 'delete')
      .onCall(0).resolves(motorcycleMockWithId)
      .onCall(1).resolves(motorcycleMockWithId)
      .onCall(2).resolves(null);


  });

  after(()=>{
    sinon.restore();
  })

  describe('adicionando um novo motorcyclero', () => {
    it('criado com sucesso ', async () => {
      const motorcycle = await motorcycleService.create(motorcycleMock);
      expect(motorcycle).to.be.deep.equal(motorcycleMockWithId)
    });

    it('tiver erro ao criar um novo motorcyclero', async () => {
      try {
        await motorcycleService.create({} as any);
      } catch (error) {
        expect(error).to.be.instanceOf(ZodError);
      }
    });
  })

  describe('buscando todos os motorcycleros do db', () => {
    it('busca realizada com sucesso', async () => {
      const motorcycle = await motorcycleService.read();
      expect(motorcycle).to.be.deep.equal([motorcycleMockWithId])
    });
  })

  describe('buscando por motorcyclero pelo id', () => {
    it('busca realizada com sucesso', async () => {
      const motorcycle = await motorcycleService.readOne(idValido);
      expect(motorcycle).to.be.deep.equal(motorcycleMockWithId)
    });

    it('busca com id inválido', async () => {
      try {
        await motorcycleService.readOne("idErrado123");
      } catch (error: any) {
        expect(error.message).to.be.deep.equal(ErrorTypes.ObjectNotFound);
      }
    });
  });


  describe('fazendo update do motorcyclero pelo id', () => {
    it('update realizado com sucesso', async () => {
      const motorcycle = await motorcycleService.update(idValido, motorcycleMockUpdate);
      expect(motorcycle).to.be.deep.equal(motorcycleMockUpdateWithId)
    });

    it('passando id que não foi encontrado no bd', async () => {
      try {
        await motorcycleService.update("62cf1fc6498565d94eba0000", motorcycleMockUpdate);
      } catch (error: any) {
        expect(error.message).to.be.deep.equal(ErrorTypes.ObjectNotFound);
      }
    });


    it('passando id inválido', async () => {
      try {
        await motorcycleService.update("idErrado123", motorcycleMockUpdate);
      } catch (error) {
        expect(error).to.be.instanceOf(ZodError);
      }
    });

    it('passando Objeto inválido', async () => {
      try {
        await motorcycleService.update(idValido, motorcycleMockUpdateInvalido);
      } catch (error) {
        expect(error).to.be.instanceOf(ZodError);
      }
    });



  });

  describe('deletando motorcyclero pelo id', () => {
    it('deletado com sucesso', async () => {
      const motorcycle = await motorcycleService.delete(idValido);
      expect(motorcycle).to.be.deep.equal(motorcycleMockWithId)
    });

    it('passando id inválido', async () => {
      try {
        await motorcycleService.delete("idErrado123");
      } catch (error) {
        expect(error).to.be.instanceOf(ZodError);
      }
    });

    it('passando id que não foi encontrado no bd', async () => {
      try {
        await motorcycleService.delete("62cf1fc6498565d94eba0000");
      } catch (error: any) {
        expect(error.message).to.be.deep.equal(ErrorTypes.ObjectNotFound);
      }
    });

  });



  })



