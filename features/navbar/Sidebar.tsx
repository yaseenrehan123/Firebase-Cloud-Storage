"use client";
import { useSidebarStore } from '@/stores/useSidebarStore'
import React, { useState } from 'react'
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import ProfileIcon from './ProfileIcon';
import ColumnDivider from '@/components/ui/general/columnDivider';
import Navlink from '@/components/ui/navbar/navlink';
import { FaSignInAlt } from "react-icons/fa";
import { RiAccountCircleLine } from "react-icons/ri";
import { FaHome } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import NavCancelIcon from './NavCancelIcon';
import SidebarOverlay from './SidebarOverlay';
import { useRouter } from 'next/navigation';
//import { useAuthStore } from '@/stores/useAuthStore';
import { MdDelete } from "react-icons/md";
//import { signOut } from 'next-auth/react';
import useDeleteAccountConfirmationStore from '@/stores/useDeleteAccountConfirmationStore';
import { useAuth } from '@clerk/nextjs';
//import useLogout from '@/hooks/useLogout';
const Sidebar = () => {
    const { userId } = useAuth();
    const enabled = useSidebarStore((state) => state.enabled);
    const loggedIn = !!userId
    const setEnabled = useDeleteAccountConfirmationStore((state) => state.setEnabled);
    const router = useRouter();
    const onSignButton = async (e: React.MouseEvent) => {
        e.preventDefault();

        console.log("LOGGED:", loggedIn);
        if (!loggedIn) {
            console.log("NAVIGATION CODE RAN!");
            router.push('/auth/login');
            return;
        }
        console.log("LOGOUT!");
        /*await signOut({
            callbackUrl: "/"
        });*/
    }

    const onDeleteAccountButton = () => {
        setEnabled(true);
    }

    return (
        <AnimatePresence>
            {enabled && (
                <>
                    <SidebarOverlay />
                    <MotionConfig transition={{ duration: 0.5, type: 'spring', bounce: 0.2 }}>
                        <motion.div
                            className='w-screen sm:w-1/2 md:w-60 h-screen bg-black/80 z-20 fixed top-0 right-0 flex items-stretch flex-col
                gap-4 pt-10 pl-2 pr-2 text-center text-white overflow-y-auto sidebar'
                            initial={{ x: '100%', opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: '100%', opacity: 0 }}
                        >
                            <ProfileIcon variant='sidebar' username='Magstar' />
                            <ColumnDivider variant='thin' />
                            <Navlink variant='sidebar' onClick={(e) => onSignButton(e)} navigateRoute={false}>
                                <FaSignInAlt /> {!loggedIn ? 'Sign In' : 'Sign Out'}
                            </Navlink>
                            <Navlink variant='sidebar' href={'/profile'}>
                                <RiAccountCircleLine /> Profile
                            </Navlink>
                            <ColumnDivider variant='thin' />
                            <Navlink variant='sidebar' href={'/'}>
                                <FaHome />Home
                            </Navlink>
                            <Navlink variant='sidebar' href={'/about'}>
                                <FaInfoCircle />About
                            </Navlink>
                            <Navlink variant='sidebar' href={'/contact'}>
                                <FaPhoneAlt />Contact
                            </Navlink>
                            {loggedIn && <Navlink variant='sidebar' navigateRoute={false} className={'gap-2'}
                                onClick={onDeleteAccountButton}>
                                <MdDelete className='text-red-500' /> Delete Account
                            </Navlink>}
                            <NavCancelIcon />
                        </motion.div>
                    </MotionConfig>
                </>
            )}
        </AnimatePresence>
    );
};



export default Sidebar