import mongoose, { Schema, Document } from 'mongoose'
import { Booking } from '@/types/booking'

export interface BookingDocument extends Omit<Booking, '_id'>, Document {}

const BookingSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
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
  date: {
    type: String,
    required: [true, 'Date is required'],
  },
  time: {
    type: String,
    required: [true, 'Time is required'],
  },
  service: {
    type: String,
    required: [true, 'Service is required'],
    trim: true,
  },
  message: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true,
})

export default mongoose.models.Booking || mongoose.model<BookingDocument>('Booking', BookingSchema)
