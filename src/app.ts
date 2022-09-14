import express from 'express';
import 'express-async-errors';
import errorHandler from './middlewares/erros';
import routerCar from './routes/routerCar';

const app = express();
app.use(express.json());
app.use(routerCar);
app.use(errorHandler);

export default app;
