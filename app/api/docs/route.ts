import { NextRequest, NextResponse } from 'next/server'
import { swaggerSpec } from '@/lib/swagger'
import { corsHeaders, handleCORS } from '@/lib/cors'

export async function GET(request: NextRequest) {
  // Handle CORS preflight
  const corsResponse = handleCORS(request)
  if (corsResponse) return corsResponse

  return NextResponse.json(swaggerSpec, {
    headers: corsHeaders(request)
  })
}
