# Booking Email Service

A simple Next.js backend with TypeScript for handling booking requests with email notifications and MongoDB Atlas database storage.

## Features

- ✅ Booking form submission with validation
- ✅ Email notifications to admin and customer
- ✅ MongoDB Atlas database integration
- ✅ TypeScript for type safety
- ✅ Zod validation
- ✅ RESTful API endpoints

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment Variables:**
   Copy `env.example` to `.env.local` and fill in your values:
   ```bash
   cp env.example .env.local
   ```

3. **Configure MongoDB Atlas:**
   - Create a MongoDB Atlas account
   - Create a new cluster
   - Get your connection string
   - Add it to `MONGODB_URI` in `.env.local`

4. **Configure Email (Gmail example):**
   - Enable 2-factor authentication on your Gmail
   - Generate an app password
   - Add your email and app password to `.env.local`

5. **Run the development server:**
   ```bash
   # Using npm
   npm run dev
   
   # Using pnpm
   pnpm dev
   
   # For production build and start
   pnpm run pnpm:start
   ```

## API Documentation

### Swagger UI
Visit `http://localhost:3000/swagger` to access the interactive API documentation where you can:
- Test all API endpoints directly
- See request/response examples
- Try the email functionality with real data

## API Endpoints

### POST /api/bookings
Create a new booking

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "date": "2024-01-15",
  "time": "10:00 AM",
  "service": "Haircut",
  "message": "Optional message"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Booking created successfully",
  "data": {
    "id": "booking_id",
    "name": "John Doe",
    "email": "john@example.com",
    "service": "Haircut",
    "date": "2024-01-15",
    "time": "10:00 AM"
  }
}
```

### GET /api/bookings
Get all bookings

### GET /api/bookings/[id]
Get a specific booking by ID

### DELETE /api/bookings/[id]
Delete a booking by ID

## Database Schema

The booking model includes:
- name (required)
- email (required)
- phone (required)
- date (required)
- time (required)
- service (required)
- message (optional)
- createdAt (auto-generated)
- updatedAt (auto-generated)

## Email Notifications

When a booking is created:
1. Admin receives a notification email with booking details
2. Customer receives a confirmation email

## Usage Example

```javascript
// Create a booking
const response = await fetch('/api/bookings', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '1234567890',
    date: '2024-01-15',
    time: '10:00 AM',
    service: 'Haircut',
    message: 'Looking forward to the appointment!'
  })
})

const result = await response.json()
console.log(result)
```
