import { NextRequest, NextResponse } from 'next/server'
import { swaggerSpec } from '@/lib/swagger'
import { corsHeaders, handleCORS } from '@/lib/cors'

export async function GET(request: NextRequest) {
  // Handle CORS preflight
  const corsResponse = handleCORS(request)
  if (corsResponse) return corsResponse

  // Always return JSON spec - browser requests are handled by middleware rewrite
  // JSON requests (with ?format=json or Accept: application/json) come here
  return NextResponse.json(swaggerSpec, {
    headers: corsHeaders(request)
  })
}
