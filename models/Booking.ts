import mongoose, { Schema, Document } from 'mongoose'
import { Booking } from '@/types/booking'

export interface BookingDocument extends Omit<Booking, '_id'>, Document {}

const BookingSchema: Schema = new Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: [true, 'Phone is required'],
    trim: true,
  },
  service: {
    type: String,
    required: [true, 'Service is required'],
    trim: true,
  },
  staff: {
    type: String,
    required: [true, 'Staff is required'],
    trim: true,
  },
  appointmentDate: {
    type: String,
    required: [true, 'Appointment date is required'],
  },
}, {
  timestamps: true,
})

export default mongoose.models.Booking || mongoose.model<BookingDocument>('Booking', BookingSchema)
