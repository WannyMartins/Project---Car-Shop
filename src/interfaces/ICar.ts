import { z } from 'zod';
import { vehicleZodSchema } from './IVehicle';

const carZodSchema = vehicleZodSchema.extend({
  doorsQty: z.number().int().positive().gte(1900)
    .lte(2022),
  seatsQty: z.number().gte(2)
    .lte(7),
});

type ICar = z.infer<typeof carZodSchema >;

export { carZodSchema, ICar };
