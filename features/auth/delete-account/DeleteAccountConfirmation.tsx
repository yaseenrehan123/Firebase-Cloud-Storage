"use client";
import useDeleteAccountConfirmationStore from '@/stores/useDeleteAccountConfirmationStore'
import React, { useEffect, useState } from 'react'
import DeleteConfirmationCancelIcon from './DeleteAccountConfirmationCancelIcon';
import FormField from '@/components/ui/form/formField';
import Button from '@/components/ui/general/button';
import { useForm } from 'react-hook-form';
import type { DeleteAccountConfirmationFields } from '@/libs/types';
import { zodResolver } from '@hookform/resolvers/zod';
import deleteAccountConfirmationSchema from '@/schemas/deleteAccountConfirmationSchema';
import { useMutation } from '@tanstack/react-query';
//import { useSession } from 'next-auth/react';
import { deleteUser } from '@/actions/userActions';
import Message from '@/components/ui/general/message';
import { useUser } from '@clerk/nextjs';
const DeleteAccountConfirmation = () => {
    const [confirmed, setConfirmed] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');

    const enabled = useDeleteAccountConfirmationStore((state) => state.enabled);
    const setEnabled = useDeleteAccountConfirmationStore((state) => state.setEnabled);

    //const { data: session, status } = useSession();
    const { user } = useUser();
    const email: string = user?.primaryEmailAddress?.emailAddress || ""

    const { handleSubmit, register, reset, watch, formState: { errors } } = useForm<DeleteAccountConfirmationFields>({
        resolver: zodResolver(deleteAccountConfirmationSchema)
    });

    const confirmationEmail: string = watch("email");

    const { mutate, isPending, isError, isSuccess } = useMutation({
        mutationKey: ["deleteAccount"],
        mutationFn: (data: DeleteAccountConfirmationFields) => deleteUser(data),
        onSuccess: () => {
            setMessage("Success");
            setEnabled(false);
            window.location.href = "/"

        },
        onError: (e: Error) => {
            setMessage(e.message)
        }
    });

    const onSubmit = async (data: DeleteAccountConfirmationFields) => {
        console.log("DELETE ACCOUNT BUTTON CLICKED!");
        await mutate({
            email: data.email
        });
    }

    useEffect(() => {
        if (!email) {
            setConfirmed(false);
            return;
        }

        setConfirmed(confirmationEmail === email);
    }, [confirmationEmail]);

    if (!enabled) return (<div></div>)
    return (
        <div className='fixed w-[clamp(20rem,80vw,40rem)] h-[clamp(10rem,50vh,30rem)] bg-black rounded-[8px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform
        outline-2 outline-gray-500 flex flex-col items-center gap-4 font-roboto p-4 z-30'>
            <div className='text-white text-[clamp(1.5rem,8vw,3rem)] font-bold'>
                Are you sure you?
            </div>

            <form className='flex items-center flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>
                <FormField
                    placeholder='Confirm Email'
                    {...register("email")}
                />
                <Message content={errors.email?.message} variant='error' />

                {confirmed && <div className='text-yellow-500 text-center'>
                    This action cannot be undone! Your account would be permanantely deleted! Proceed with caution!
                </div>}

                {confirmed &&
                    <Button className='text-red-500 w-32 font-bold font-roboto'
                        type='submit'>
                        {isPending ? "Loading..." : "Delete Account"}
                    </Button>}
            </form>
            <Message content={message} disableOnContent='md'
                variant={isError ? "error" : "success"} />
            <DeleteConfirmationCancelIcon />
        </div>
    )
}

export default DeleteAccountConfirmation