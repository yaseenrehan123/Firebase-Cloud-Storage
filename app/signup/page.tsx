import React from 'react'
import SignupSection from '@/features/signup/SignupSection';
const SignupPage = () => {
    return (
        <div className="w-screen h-screen bg-neutral-900 pt-3">
            <div className="flex items-center flex-col">
                <SignupSection />
            </div>
        </div>
    )
}

export default SignupPage