import { z } from 'zod';

const vehicleZodSchema = z.object({
  model: z.string().min(3),
  year: z.number().int().positive().gte(1900)
    .lte(2022),
  color: z.string().min(3),
  status: z.boolean().optional(),
  buyValue: z.number().int().positive(),
});

type IVehicle = z.infer<typeof vehicleZodSchema>;

export { vehicleZodSchema, IVehicle };
