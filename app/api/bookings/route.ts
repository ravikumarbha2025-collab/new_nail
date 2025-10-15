import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Booking from '@/models/Booking'
import { sendBookingEmail } from '@/lib/email'
import { bookingSchema } from '@/lib/validations'

/**
 * @swagger
 * /api/bookings:
 *   post:
 *     summary: Create a new booking
 *     description: Creates a new booking, saves it to the database, and sends email notifications to both admin and customer
 *     tags: [Bookings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BookingRequest'
 *           example:
 *             firstName: "John"
 *             lastName: "Doe"
 *             email: "john.doe@example.com"
 *             phone: "1234567890"
 *             service: "Haircut"
 *             staff: "Sarah Johnson"
 *             appointmentDate: "2024-01-15"
 *     responses:
 *       201:
 *         description: Booking created successfully
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: "507f1f77bcf86cd799439011"
 *                         firstName:
 *                           type: string
 *                           example: "John"
 *                         lastName:
 *                           type: string
 *                           example: "Doe"
 *                         email:
 *                           type: string
 *                           example: "john.doe@example.com"
 *                         service:
 *                           type: string
 *                           example: "Haircut"
 *                         staff:
 *                           type: string
 *                           example: "Sarah Johnson"
 *                         appointmentDate:
 *                           type: string
 *                           example: "2024-01-15"
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *   get:
 *     summary: Get all bookings
 *     description: Retrieves all bookings from the database, sorted by creation date (newest first)
 *     tags: [Bookings]
 *     responses:
 *       200:
 *         description: List of all bookings
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Booking'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

export async function POST(request: NextRequest) {
  try {
    // Connect to database
    await connectDB()

    // Parse request body
    const body = await request.json()

    // Validate input
    const validatedData = bookingSchema.parse(body)

    // Save booking to database
    const booking = new Booking(validatedData)
    await booking.save()

    // Send email notifications
    const emailResult = await sendBookingEmail(validatedData)

    if (!emailResult.success) {
      console.error('Email sending failed:', emailResult.message)
      // Don't fail the request if email fails, just log it
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Booking created successfully',
        data: {
          id: booking._id,
          firstName: booking.firstName,
          lastName: booking.lastName,
          email: booking.email,
          service: booking.service,
          staff: booking.staff,
          appointmentDate: booking.appointmentDate,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Booking creation failed:', error)

    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed',
          errors: error,
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    // Connect to database
    await connectDB()

    // Get all bookings
    const bookings = await Booking.find({}).sort({ createdAt: -1 })

    return NextResponse.json(
      {
        success: true,
        data: bookings,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Failed to fetch bookings:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch bookings',
      },
      { status: 500 }
    )
  }
}
