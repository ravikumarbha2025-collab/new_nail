'use client'

import { useEffect, useState } from 'react'
import SwaggerUI from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'

export default function DocsPage() {
  const [spec, setSpec] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/docs?format=json')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to load spec: ${res.status} ${res.statusText}`)
        }
        return res.json()
      })
      .then((data) => {
        // Validate that we got a proper OpenAPI spec
        if (!data || !data.openapi) {
          throw new Error('Invalid Swagger spec received')
        }
        setSpec(data)
        setError(null)
      })
      .catch((error) => {
        console.error('Error loading Swagger spec:', error)
        setError(error.message || 'Failed to load API documentation')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading API documentation...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Documentation</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => {
              setLoading(true)
              setError(null)
              fetch('/api/docs?format=json')
                .then((res) => res.json())
                .then((data) => {
                  if (data && data.openapi) {
                    setSpec(data)
                    setError(null)
                  } else {
                    setError('Invalid Swagger spec received')
                  }
                })
                .catch((err) => setError(err.message))
                .finally(() => setLoading(false))
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  if (!spec) {
    return null
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Booking Email Service API
          </h1>
          <p className="text-gray-600">
            Interactive API documentation for testing booking and email functionality
          </p>
        </div>
        <div id="swagger-ui-container">
          <SwaggerUI 
            spec={spec}
            deepLinking={true}
            supportedSubmitMethods={['get', 'post', 'put', 'delete', 'patch', 'options']}
            tryItOutEnabled={true}
            requestInterceptor={(request: any) => {
              // Ensure CORS headers are handled
              return request
            }}
            responseInterceptor={(response: any) => {
              // Handle responses
              return response
            }}
            docExpansion="list"
            defaultModelsExpandDepth={1}
            defaultModelExpandDepth={1}
          />
        </div>
      </div>
    </div>
  )
}

