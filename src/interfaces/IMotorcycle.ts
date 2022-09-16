import { z } from 'zod';
import { vehicleZodSchema } from './IVehicle';

export const motoZodSchema = vehicleZodSchema.extend({
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z.number().int().positive().lte(2500),
});

export type IMotorcycle = z.infer<typeof motoZodSchema >;