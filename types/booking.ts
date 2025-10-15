export interface Booking {
  _id?: string | any
  firstName: string
  lastName: string
  email: string
  phone: string
  service: string
  staff: string
  appointmentDate: string
  createdAt?: Date
  updatedAt?: Date
}

export interface BookingFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  service: string
  staff: string
  appointmentDate: string
}
