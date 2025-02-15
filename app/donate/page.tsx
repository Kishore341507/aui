import React from 'react'
import Donate from './donate'
import { Suspense } from 'react'

export default function DonatePage() {
    return (
        <div>
            {/* <AuthProvider> */}
                <Suspense fallback={<div>Loading...</div>}>
                    <Donate></Donate>
                </Suspense>
            {/* </AuthProvider> */}
        </div>
    )
}
