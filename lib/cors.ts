import { NextRequest, NextResponse } from 'next/server'

export function corsHeaders(request: NextRequest) {
  const origin = request.headers.get('origin')
  
  // Allow requests from localhost and your Vercel domain
  const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://new-nail-h4wq.vercel.app',
    'https://vercel.app'
  ]
  
  const isAllowedOrigin = origin && allowedOrigins.some(allowed => 
    origin.startsWith(allowed) || origin.includes('localhost')
  )
  
  return {
    'Access-Control-Allow-Origin': isAllowedOrigin ? origin : 'https://new-nail-h4wq.vercel.app',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
    'Access-Control-Allow-Credentials': 'true',
  }
}

export function handleCORS(request: NextRequest) {
  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 200,
      headers: corsHeaders(request),
    })
  }
  
  return null
}
