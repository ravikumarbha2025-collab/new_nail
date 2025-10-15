// import nodemailer from 'nodemailer'
import { BookingFormData } from '@/types/booking'

// Email functionality temporarily disabled - focusing on database operations
// const transporter = nodemailer.createTransporter({
//   service: 'gmail', // or your email service
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// })

export async function sendBookingEmail(bookingData: BookingFormData) {
  const { firstName, lastName, email, phone, service, staff, appointmentDate } = bookingData

  // Email functionality temporarily commented out
  console.log('📧 Email would be sent with booking data:', {
    firstName,
    lastName,
    email,
    phone,
    service,
    staff,
    appointmentDate
  })

  // Simulate email sending success
  return { success: true, message: 'Email functionality disabled - booking saved to database only' }

  // const mailOptions = {
  //   from: process.env.EMAIL_USER,
  //   to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
  //   subject: `New Booking Request from ${name}`,
  //   html: `
  //     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  //       <h2 style="color: #333;">New Booking Request</h2>
  //       
  //       <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
  //         <h3 style="color: #555; margin-top: 0;">Customer Details:</h3>
  //         <p><strong>Name:</strong> ${name}</p>
  //         <p><strong>Email:</strong> ${email}</p>
  //         <p><strong>Phone:</strong> ${phone}</p>
  //       </div>

  //       <div style="background-color: #e8f4fd; padding: 20px; border-radius: 8px; margin: 20px 0;">
  //         <h3 style="color: #555; margin-top: 0;">Booking Details:</h3>
  //         <p><strong>Service:</strong> ${service}</p>
  //         <p><strong>Date:</strong> ${date}</p>
  //         <p><strong>Time:</strong> ${time}</p>
  //         ${message ? `<p><strong>Message:</strong> ${message}</p>` : ''}
  //       </div>

  //       <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
  //         <p style="color: #666; font-size: 14px;">
  //           This booking has been automatically saved to your database.
  //         </p>
  //       </div>
  //     </div>
  //   `,
  // }

  // const customerMailOptions = {
  //   from: process.env.EMAIL_USER,
  //   to: email,
  //   subject: 'Booking Confirmation - We received your request',
  //   html: `
  //     <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  //       <h2 style="color: #333;">Thank you for your booking request!</h2>
  //       
  //       <p>Dear ${name},</p>
  //       
  //       <p>We have received your booking request and will get back to you shortly to confirm your appointment.</p>
  //       
  //       <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
  //         <h3 style="color: #555; margin-top: 0;">Your Booking Details:</h3>
  //         <p><strong>Service:</strong> ${service}</p>
  //         <p><strong>Date:</strong> ${date}</p>
  //         <p><strong>Time:</strong> ${time}</p>
  //         ${message ? `<p><strong>Your Message:</strong> ${message}</p>` : ''}
  //       </div>

  //       <p>We will contact you at <strong>${phone}</strong> to confirm your appointment.</p>
  //       
  //       <p>Thank you for choosing our services!</p>
  //       
  //       <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
  //         <p style="color: #666; font-size: 14px;">
  //           This is an automated confirmation email. Please do not reply to this email.
  //         </p>
  //       </div>
  //     </div>
  //   `,
  // }

  // try {
  //   // Send email to admin
  //   await transporter.sendMail(mailOptions)
  //   
  //   // Send confirmation email to customer
  //   await transporter.sendMail(customerMailOptions)
  //   
  //   return { success: true, message: 'Emails sent successfully' }
  // } catch (error) {
  //   console.error('Email sending failed:', error)
  //   return { success: false, message: 'Failed to send emails' }
  // }
}
