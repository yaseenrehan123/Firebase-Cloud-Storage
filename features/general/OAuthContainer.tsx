import React from 'react'
import { SignInButton } from '@clerk/nextjs'
import OAuthButton from './OAuthButton'
const OAuthContainer = () => {
    return (
        <div className='flex items-center flex-col gap-2'>
            <OAuthButton title='Sign In With Google' strategy="oauth_google" />
        </div>
    )
}

export default OAuthContainer