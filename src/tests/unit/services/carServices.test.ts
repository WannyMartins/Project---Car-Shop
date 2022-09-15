// template para criação dos testes de cobertura da camada de model
// import { expect } from 'chai';
// import * as sinon from 'sinon';
// import { ZodError } from 'zod';
// import { ErrorTypes } from '../../../errors/catalog';
// import FrameModel from '../../../models/Frame';
// import FrameService from '../../../services/Frame';
// import { frameMock, frameMockForChange, frameMockForChangeWithId, frameMockInvalid, frameMockWithId } from '../../mocks/frameMock';

// describe('Frame Service', () => {
// 	const frameModel = new FrameModel();
// 	const frameService = new FrameService(frameModel);

// 	before(() => {
// 		sinon.stub(frameModel, 'create').resolves(frameMockWithId);
// 		sinon.stub(frameModel, 'readOne')
// 			.onCall(0).resolves(frameMockWithId)
// 			.onCall(1).resolves(null);
// 		sinon.stub(frameModel, 'update').resolves(frameMockForChangeWithId);

// 	});

// 	after(() => {
// 		sinon.restore()
// 	});

// 	describe('Create Frame', () => {
// 		it('Success', async () => {
// 			const frameCreated = await frameService.create(frameMock);

// 			expect(frameCreated).to.be.deep.equal(frameMockWithId);
// 		});

// 		it('Failure', async () => {
// 			try {
// 				await frameService.create({} as any);
// 			} catch (error) {
// 				expect(error).to.be.instanceOf(ZodError);
// 			}
// 		});
// 	});


import * as sinon from 'sinon';
import chai from 'chai';
import CarModel from '../../../models/CarModel';
import { Model } from 'mongoose';
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