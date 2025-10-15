export interface Booking {
  _id?: string | any
  name: string
  email: string
  phone: string
  date: string
  time: string
  service: string
  message?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface BookingFormData {
  name: string
  email: string
  phone: string
  date: string
  time: string
  service: string
  message?: string
}
