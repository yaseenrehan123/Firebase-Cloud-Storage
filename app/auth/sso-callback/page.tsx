import PageContainer from '@/features/general/PageContainer'
import { AuthenticateWithRedirectCallback } from '@clerk/nextjs'
import React from 'react'

const page = () => {
    return (
        <PageContainer>
            <AuthenticateWithRedirectCallback
                signInForceRedirectUrl={"/"}
                signUpForceRedirectUrl={"/"} />
        </PageContainer>
    )
}

export default page