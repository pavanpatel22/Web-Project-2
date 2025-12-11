// src/components/DatabaseTest.tsx

import { useState, useEffect } from 'react'
import { supabase } from '../services/supabase'

export function DatabaseTest() {
  const [status, setStatus] = useState<'testing' | 'success' | 'error'>('testing')
  const [message, setMessage] = useState('Testing database connection...')
  const [details, setDetails] = useState<any>(null)

  useEffect(() => {
    testConnection()
  }, [])

  const testConnection = async () => {
    try {
      // Test 1: Check Supabase connection
      const { data: healthCheck, error: healthError } = await supabase
        .from('profiles')
        .select('count')
        .limit(0)

      if (healthError) {
        throw new Error(`Connection failed: ${healthError.message}`)
      }

      // Test 2: Check authentication
      const { data: { session } } = await supabase.auth.getSession()

      // Test 3: Get storage buckets
      const { data: buckets } = await supabase.storage.listBuckets()

      setStatus('success')
      setMessage('✅ Database connected successfully!')
      setDetails({
        connection: 'Active',
        authenticated: session ? 'Yes' : 'No',
        userId: session?.user?.id || 'Not logged in',
        buckets: buckets?.map(b => b.name).join(', ') || 'None',
        supabaseUrl: import.meta.env.VITE_SUPABASE_URL?.substring(0, 30) + '...'
      })

    } catch (error: any) {
      setStatus('error')
      setMessage(`❌ Connection failed: ${error.message}`)
      setDetails({
        error: error.message,
        supabaseUrl: import.meta.env.VITE_SUPABASE_URL || 'NOT SET',
        hasAnonKey: !!import.meta.env.VITE_SUPABASE_ANON_KEY
      })
    }
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      background: status === 'success' ? 'rgba(34, 197, 94, 0.1)' : 
                  status === 'error' ? 'rgba(239, 68, 68, 0.1)' : 
                  'rgba(99, 102, 241, 0.1)',
      border: `1px solid ${status === 'success' ? '#22c55e' : 
                           status === 'error' ? '#ef4444' : 
                           '#6366f1'}`,
      borderRadius: '12px',
      padding: '1.5rem',
      maxWidth: '400px',
      backdropFilter: 'blur(20px)',
      boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
      zIndex: 9999
    }}>
      <h3 style={{ 
        margin: '0 0 1rem 0',
        color: status === 'success' ? '#22c55e' : 
               status === 'error' ? '#ef4444' : 
               '#6366f1',
        fontSize: '1.125rem',
        fontWeight: 600
      }}>
        Database Status
      </h3>
      
      <p style={{ 
        margin: '0 0 1rem 0',
        color: 'var(--text)',
        fontSize: '0.9375rem'
      }}>
        {message}
      </p>

      {details && (
        <div style={{
          background: 'rgba(0,0,0,0.2)',
          borderRadius: '8px',
          padding: '1rem',
          fontSize: '0.875rem',
          fontFamily: 'monospace'
        }}>
          {Object.entries(details).map(([key, value]) => (
            <div key={key} style={{ 
              marginBottom: '0.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              gap: '1rem'
            }}>
              <span style={{ color: 'var(--text-secondary)' }}>{key}:</span>
              <span style={{ color: 'var(--text)', fontWeight: 500 }}>
                {String(value)}
              </span>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={testConnection}
        style={{
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          background: 'var(--gradient)',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '0.875rem',
          fontWeight: 600,
          width: '100%'
        }}
      >
        Test Again
      </button>
    </div>
  )
}