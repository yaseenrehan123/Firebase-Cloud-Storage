import VerifySection from '@/features/auth/verify/VerifySection'
import React from 'react'

const VerifyPage = () => {
    return (
        <div className="w-screen h-screen bg-neutral-900 pt-3">
            <div className="flex items-center flex-col">
                <VerifySection />
            </div>
        </div>
    )
}

export default VerifyPage