"use client";
import React from 'react'
import FormContainer from '@/components/ui/form/formContainer'
import Alignment from '@/components/ui/general/alignment'
import FormField from '@/components/ui/form/formField';
import { useForm } from 'react-hook-form'
import { UploadFormFields } from '@/libs/types'
import { zodResolver } from '@hookform/resolvers/zod'
import uploadFormSchema from '@/schemas/uploadFormSchema'
import Message from '@/components/ui/general/message'
import { MdAddCircleOutline } from "react-icons/md";
import { useMutation } from '@tanstack/react-query';
import Button from '@/components/ui/general/button';
const UploadForm = () => {
    const { register, reset, handleSubmit, formState: { errors } } = useForm<UploadFormFields>({
        resolver: zodResolver(uploadFormSchema)
    });
    const { isPending, isSuccess, isError, error, mutateAsync } = useMutation({
        mutationKey: ["uploadForm"],
        mutationFn: async () => { }
    });
    const onFormSubmitted = async () => {
        await mutateAsync();
    }
    return (
        <FormContainer variant='dark' className='text-white' onSubmit={handleSubmit(onFormSubmitted)}>
            <div className='text-4xl font-bold font-inter'>
                Upload an Image
            </div>
            <Alignment variant='colCenter' gap='lg' className='w-full'>
                <Alignment variant='colLeft' className='w-full'>
                    <FormField type='text' variant="default" bg="light" {...register("caption")}
                        placeholder='Caption' />
                    {errors.caption && <Message variant='error' disableOnContent="never" content={errors.caption.message} />}
                </Alignment>
                <Alignment variant='colLeft' className='w-full'>
                    <Alignment variant='colCenter' className='w-full'>
                        <label className='w-36 h-24 rounded-2xl border-blue-600 border-4 border-dotted relative 
                        hover:cursor-pointer hover:scale-99 active:scale-98 hover:opacity-50 transition-all duration-150'>
                            <MdAddCircleOutline className='absolute top-1/2 left-1/2 -translate-1/2 text-blue-500 text-4xl' />
                            <FormField type="file" accept='image/*' variant="default" bg="light" {...register("file")}
                                className='w-full h-full hidden' />
                        </label>

                    </Alignment>

                    {errors.file && <Message variant='error' disableOnContent="never" content={errors.file.message} />}
                </Alignment>
                <Button className={`${isPending ? "text-yellow-500" : "text-black"}`} type='submit'>
                    {isPending ? "Loading..." : "Submit"}
                </Button>
                <Message variant={isError ? "error" : isSuccess ? "success" : "default"}
                    content={isError ? error.message : isSuccess ? "Success" : ""}
                    disableOnContent='md' />
            </Alignment>
        </FormContainer>

    )
}

export default UploadForm