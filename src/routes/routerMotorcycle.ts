import { Router } from 'express';
import MotorcycleController from '../controllers/MotorcycleController';
import MotorcycleModel from '../models/MotorcycleModel';
import MotorcycleService from '../services/MotorcycleService';

const route = Router();

const motorcycles = '/motorcycles/:id';

const motorcycle = new MotorcycleModel();
const motorcycleService = new MotorcycleService(motorcycle);
const motorcycleController = new MotorcycleController(motorcycleService);

route.post('/motorcycles', (req, res) => motorcycleController.create(req, res));
route.get(motorcycles, (req, res) => motorcycleController.readOne(req, res));
route.put(motorcycles, (req, res) => motorcycleController.update(req, res));
route.delete(motorcycles, (req, res) => motorcycleController.delete(req, res));
route.get('/motorcycles', (req, res) => motorcycleController.read(req, res));

export default route;
