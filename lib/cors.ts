import { NextRequest, NextResponse } from 'next/server'

export function corsHeaders(request: NextRequest) {
  const origin = request.headers.get('origin')
  
  // Allow requests from localhost and your Vercel domain
  const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:3001',
    'https://new-nail-h4wq.vercel.app',
    'https://vercel.app'
  ]
  
  // More permissive CORS for development
  const isAllowedOrigin = origin && (
    allowedOrigins.some(allowed => origin.startsWith(allowed)) ||
    origin.includes('localhost') ||
    origin.includes('127.0.0.1') ||
    origin.includes('vercel.app')
  )
  
  return {
    'Access-Control-Allow-Origin': isAllowedOrigin ? origin : '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, PATCH',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, Accept, Origin, Cache-Control, X-File-Name',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Max-Age': '86400',
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
