import React from 'react'
import Responsive from '@/components/ui/general/responsive'
import NavMenuIcon from './NavMenuIcon'
import ProfileIcon from './ProfileIcon'
import Navlink from '@/components/ui/navbar/navlink'
const Mainbar = () => {
    return (
        <div className='w-screen flex items-center justify-between bg-black min-h-10  p-1.5 z-10
        fixed top-0 left-0'>
            <div></div>
            <div className='flex items-center justify-center gap-4'>
                <Responsive display="hidden" md="flex"><Navlink href={'/'}>Home</Navlink></Responsive>
                <Responsive display="hidden" md="flex"><Navlink href={'/about'}>About</Navlink></Responsive>
                <Responsive display="hidden" md="flex"><Navlink href={'/contact'}>Contact</Navlink></Responsive>
            </div>
            <div className='flex items-center justify-center'>
                <ProfileIcon username='Magstar' />
            </div>
        </div>
    )
}

export default Mainbar