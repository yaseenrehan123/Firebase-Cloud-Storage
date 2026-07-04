import LoginSection from '@/features/login/LoginSection'
import React from 'react'

const LoginPage = () => {
    return (
        <div className="w-screen h-screen bg-neutral-900 pt-3">
            <div className="flex items-center flex-col">
                <LoginSection />
            </div>
        </div>
    )
}

export default LoginPage