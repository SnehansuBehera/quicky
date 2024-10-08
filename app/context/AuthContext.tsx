'use client'

import { SessionProvider } from 'next-auth/react'
import React from 'react'

interface SessionProps {
    children: React.ReactNode
}

const AuthContext: React.FC<SessionProps> = ({ children }) => {
    return (
        <SessionProvider>{children}</SessionProvider>
    )
}

export default AuthContext
