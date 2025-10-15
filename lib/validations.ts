import { z } from 'zod'

export const bookingSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters').max(50, 'First name must be less than 50 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters').max(50, 'Last name must be less than 50 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits').max(15, 'Phone number must be less than 15 digits'),
  service: z.string().min(1, 'Service is required'),
  staff: z.string().min(1, 'Staff is required'),
  appointmentDate: z.string().min(1, 'Appointment date is required'),
})

export type BookingValidationSchema = z.infer<typeof bookingSchema>
