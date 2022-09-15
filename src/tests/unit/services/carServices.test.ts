
import * as sinon from 'sinon';
import chai from 'chai';
import CarModel from '../../../models/CarModel';
import { carMock, carMockWithId } from '../../mock/mockCar';
import CarService from '../../../services/CarService';
import { ZodError } from 'zod';
const { expect } = chai;

describe('Car Model', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);

  before(async () => {
    sinon.stub(carModel, 'create').resolves(carMockWithId);
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

});