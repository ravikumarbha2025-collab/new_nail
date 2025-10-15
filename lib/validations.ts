import { z } from 'zod'

export const bookingSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  service: z.string().optional(),
  staff: z.string().optional(),
  appointmentDate: z.string().optional(),
})

export type BookingValidationSchema = z.infer<typeof bookingSchema>
