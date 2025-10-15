import mongoose, { Schema, Document } from 'mongoose'
import { Booking } from '@/types/booking'

export interface BookingDocument extends Omit<Booking, '_id'>, Document {}

const BookingSchema: Schema = new Schema({
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  service: {
    type: String,
    trim: true,
  },
  staff: {
    type: String,
    trim: true,
  },
  appointmentDate: {
    type: String,
  },
}, {
  timestamps: true,
})

export default mongoose.models.Booking || mongoose.model<BookingDocument>('Booking', BookingSchema)
