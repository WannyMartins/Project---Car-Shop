
import * as sinon from 'sinon';
import chai from 'chai';
import CarModel from '../../../models/CarModel';
import { carMock, carMockUpdate, carMockUpdateWithId, carMockWithId, idValido } from '../../mock/mockCar';
import CarService from '../../../services/CarService';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';
const { expect } = chai;

describe('Car Model', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);

  before(async () => {
    sinon.stub(carModel, 'create').resolves(carMockWithId);
    sinon.stub(carModel, 'read').resolves([carMockWithId]);
    sinon.stub(carModel, 'readOne')
      .onCall(0).resolves(carMockWithId)
      .onCall(1).resolves(null);
    sinon.stub(carModel, 'update').resolves(carMockUpdateWithId);
    sinon.stub(carModel, 'delete').resolves(carMockWithId);


  });

  after(()=>{
    sinon.restore();
  })

  describe('adicionando um novo carro', () => {
    it('criado com sucesso ', async () => {
      const car = await carService.create(carMock);
      expect(car).to.be.deep.equal(carMockWithId)
    });

    it('tiver erro ao criar um novo carro', async () => {
      try {
        await carService.create({} as any);
      } catch (error) {
        expect(error).to.be.instanceOf(ZodError);
      }
    });
  })

  describe('buscando todos os carros do db', () => {
    it('busca realizada com sucesso', async () => {
      const car = await carService.read();
      expect(car).to.be.deep.equal([carMockWithId])
    });
  })

  describe('buscando por carro pelo id', () => {
    it('busca realizada com sucesso', async () => {
      const car = await carService.readOne(idValido);
      expect(car).to.be.deep.equal(carMockWithId)
    });

    it('busca com id inválido', async () => {
      try {
        await carService.readOne("idErrado123");
      } catch (error: any) {
        expect(error.message).to.be.deep.equal(ErrorTypes.ObjectNotFound);;
      }
    });
  });


    describe('fazendo update do carro pelo id', () => {
      it('update realizado com sucesso', async () => {
        const car = await carService.update(idValido, carMockUpdate);
        expect(car).to.be.deep.equal(carMockUpdateWithId)
      });
  
      it('passando id inválido', async () => {
        try {
          await carService.update("idErrado123", carMockUpdate);
        } catch (error) {
          expect(error).to.be.instanceOf(ZodError);
        }
      });
    });

    describe('deletando carro pelo id', () => {
      it('deletado com sucesso', async () => {
        const car = await carService.delete(idValido);
        expect(car).to.be.deep.equal(carMockWithId)
      });
  
      it('passando id inválido', async () => {
        try {
          await carService.delete("idErrado123");
        } catch (error) {
          expect(error).to.be.instanceOf(ZodError);
        }
      });
    });

  

  })



