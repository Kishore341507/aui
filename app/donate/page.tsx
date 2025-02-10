import React from 'react'
import AuthProvider from '../auth/Provider'
import Donate from './donate'

export default function DonatePage() {
  return (
    <div>
      <AuthProvider>
        <Donate></Donate>
      </AuthProvider>
    </div>
  )
}
