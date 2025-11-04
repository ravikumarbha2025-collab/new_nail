import { Resend } from 'resend'
import { BookingFormData } from '@/types/booking'

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendBookingEmail(bookingData: BookingFormData) {
  const { firstName, lastName, email, phone, service, staff, appointmentDate } = bookingData

  // Check if Resend API key is configured
  if (!process.env.RESEND_API_KEY) {
    console.warn('⚠️  RESEND_API_KEY not configured. Email sending skipped.')
    return { success: false, message: 'Email service not configured' }
  }

  // Check if customer email is provided
  if (!email) {
    console.warn('⚠️  Customer email not provided. Email sending skipped.')
    return { success: false, message: 'Customer email not provided' }
  }

  const customerName = `${firstName || ''} ${lastName || ''}`.trim() || 'Customer'

  try {
    // Send confirmation email to customer (from POST request)
    let customerEmailSent = false
    let customerEmailMessage = ''
    
    const customerEmailResult = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: email,
      subject: 'Booking Confirmation - We received your request',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px;">Booking Confirmation</h1>
          </div>
          
          <div style="background-color: #ffffff; padding: 30px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 10px 10px;">
            <p style="color: #333; font-size: 16px; line-height: 1.6;">Dear ${customerName},</p>
            
            <p style="color: #555; font-size: 15px; line-height: 1.6;">
              Thank you for your booking request! We have received your appointment details and will get back to you shortly to confirm your appointment.
            </p>
            
            <div style="background-color: #f8f9fa; padding: 25px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #667eea;">
              <h3 style="color: #333; margin-top: 0; margin-bottom: 20px; font-size: 18px;">Your Booking Details:</h3>
              
              ${firstName ? `<p style="color: #555; margin: 8px 0; font-size: 15px;"><strong style="color: #333;">Name:</strong> ${customerName}</p>` : ''}
              ${email ? `<p style="color: #555; margin: 8px 0; font-size: 15px;"><strong style="color: #333;">Email:</strong> ${email}</p>` : ''}
              ${phone ? `<p style="color: #555; margin: 8px 0; font-size: 15px;"><strong style="color: #333;">Phone:</strong>+1 ${phone}</p>` : ''}
              ${service ? `<p style="color: #555; margin: 8px 0; font-size: 15px;"><strong style="color: #333;">Service:</strong> ${service}</p>` : ''}
              ${staff ? `<p style="color: #555; margin: 8px 0; font-size: 15px;"><strong style="color: #333;">Staff:</strong> ${staff}</p>` : ''}
              ${appointmentDate ? `<p style="color: #555; margin: 8px 0; font-size: 15px;"><strong style="color: #333;">Appointment Date:</strong> ${appointmentDate}</p>` : ''}
            </div>
            
            <p style="color: #555; font-size: 15px; line-height: 1.6;">
              We will contact you${phone ? ` at <strong>+1 ${phone}</strong>` : ''} to confirm your appointment. Please keep this email for your records.
            </p>
            
            <p style="color: #555; font-size: 15px; line-height: 1.6; margin-top: 25px;">
              Thank you for choosing our services!
            </p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
              <p style="color: #999; font-size: 12px; margin: 0;">
                This is an automated confirmation email. Please do not reply to this email.
              </p>
            </div>
          </div>
        </div>
        `,
      })

    if (customerEmailResult.error) {
      console.error('❌ Failed to send customer email:', customerEmailResult.error)
      customerEmailMessage = `Failed to send customer email: ${customerEmailResult.error.message}`
    } else {
      customerEmailSent = true
      console.log('✅ Customer confirmation email sent successfully to:', email)
    }

    // ADMIN EMAIL - Send notification to admin when someone books
    const adminEmail = process.env.ADMIN_EMAIL || 'roshan742587@gmail.com'
    let adminEmailSent = false
    let adminEmailMessage = ''
    
    console.log(`📧 Attempting to send admin email to: ${adminEmail}`)
    console.log(`   ADMIN_EMAIL env var: ${process.env.ADMIN_EMAIL || 'NOT SET'}`)
    
    try {
      const adminEmailResult = await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
        to: adminEmail,
        subject: `New Booking Request from ${customerName}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 28px;">New Booking Request</h1>
              </div>
              
              <div style="background-color: #ffffff; padding: 30px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 10px 10px;">
                <div style="background-color: #f8f9fa; padding: 25px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #667eea;">
                  <h3 style="color: #333; margin-top: 0; margin-bottom: 20px; font-size: 18px;">Customer Details:</h3>
                  
                  ${firstName ? `<p style="color: #555; margin: 8px 0; font-size: 15px;"><strong style="color: #333;">Name:</strong> ${customerName}</p>` : ''}
                  ${email ? `<p style="color: #555; margin: 8px 0; font-size: 15px;"><strong style="color: #333;">Email:</strong> ${email}</p>` : ''}
                  ${phone ? `<p style="color: #555; margin: 8px 0; font-size: 15px;"><strong style="color: #333;">Phone:</strong> ${phone}</p>` : ''}
                </div>

                <div style="background-color: #e8f4fd; padding: 25px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #2196F3;">
                  <h3 style="color: #333; margin-top: 0; margin-bottom: 20px; font-size: 18px;">Booking Details:</h3>
                  
                  ${service ? `<p style="color: #555; margin: 8px 0; font-size: 15px;"><strong style="color: #333;">Service:</strong> ${service}</p>` : ''}
                  ${staff ? `<p style="color: #555; margin: 8px 0; font-size: 15px;"><strong style="color: #333;">Staff:</strong> ${staff}</p>` : ''}
                  ${appointmentDate ? `<p style="color: #555; margin: 8px 0; font-size: 15px;"><strong style="color: #333;">Appointment Date:</strong> ${appointmentDate}</p>` : ''}
                </div>

                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
                  <p style="color: #666; font-size: 14px; margin: 0;">
                    This booking has been automatically saved to your database.
                  </p>
                </div>
              </div>
            </div>
          `,
        })

      if (adminEmailResult.error) {
        console.error('❌ Failed to send admin email:', adminEmailResult.error)
        console.error(`   Attempted to send to: ${adminEmail}`)
        adminEmailMessage = `Failed to send admin email: ${adminEmailResult.error.message}`
        
        // If error is about test mode, explain it
        if (adminEmailResult.error.message?.includes('You can only send testing emails')) {
          console.warn(`⚠️  Resend test mode limitation: Cannot send to ${adminEmail}`)
          console.warn(`   Verify your domain in Resend to send to any email address`)
        }
      } else {
        adminEmailSent = true
        console.log(`✅ Admin notification email sent successfully`)
        console.log(`   Requested recipient: ${adminEmail}`)
        console.log(`   Note: In test mode, Resend may redirect emails to your account email`)
      }
    } catch (adminError) {
      console.error('❌ Error sending admin email:', adminError)
      adminEmailMessage = `Error sending admin email: ${adminError instanceof Error ? adminError.message : 'Unknown error'}`
    }

    // Return success if at least one email was sent, or if booking was saved
    const messages = []
    if (customerEmailSent) messages.push('Customer email sent')
    else if (customerEmailMessage) messages.push(customerEmailMessage)
    
    if (adminEmailSent) messages.push('Admin email sent')
    else if (adminEmailMessage) messages.push(adminEmailMessage)

    const allMessages = messages.length > 0 ? messages.join('. ') : 'Booking saved successfully'
    
    return { 
      success: true, 
      message: allMessages,
      customerEmailSent,
      adminEmailSent
    }
  } catch (error) {
    console.error('❌ Email sending failed:', error)
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Failed to send email' 
    }
  }
}
