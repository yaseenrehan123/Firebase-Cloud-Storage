"use client";
import React, { useEffect, useState } from 'react'
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
import { useUploadThing } from '@/libs/uploadThing';
import Image from 'next/image';
import { RxCross2 } from "react-icons/rx";
const UploadForm = () => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const { startUpload } = useUploadThing("imageUploader", {
        onUploadError: (err) => {
            console.error("🔴 UploadThing Error Detail:", err.message);
            console.error("🔴 Full Error Object:", err);
        }
    });
    const { register, reset, handleSubmit, watch, setValue, formState: { errors } } = useForm<UploadFormFields>({
        resolver: zodResolver(uploadFormSchema)
    });
    const fileWatch = watch("file");
    const { isPending, isSuccess, isError, error, mutateAsync } = useMutation({
        mutationKey: ["uploadForm"],
        mutationFn: async ({ caption, file }: UploadFormFields) => {
            const filesToUpload = Array.from(file);
            const res = await startUpload(filesToUpload);
            if (!res) {
                throw new Error("Cloud Upload Failed!")
            }
            const fileUrl = res[0].ufsUrl;
            console.log("FILE URL: ", fileUrl, "CAPTION: ", caption)
            return { fileUrl, caption }
        }
    });
    useEffect(() => {
        if (fileWatch && fileWatch.length > 0) {
            const file: File = fileWatch[0];
            const url: string = URL.createObjectURL(file);
            setPreviewUrl(url);

            return () => URL.revokeObjectURL(url)
        }
        else {
            setPreviewUrl(null)
        }
    }, [fileWatch])

    const onFormSubmitted = async (data: UploadFormFields) => {
        await mutateAsync(data);
        await reset();
    }
    const onCancelPreviewClicked = () => {
        setPreviewUrl(null);
        setValue("file", undefined as unknown as FileList, { shouldValidate: true })
    }
    return (
        <FormContainer variant='dark' className='text-white' onSubmit={handleSubmit(onFormSubmitted)}>
            <div className='text-4xl font-bold font-inter'>
                Upload an Image
            </div>
            <Alignment variant='colCenter' gap='lg' className='w-full'>
                <Alignment variant='colLeft' className='w-full'>
                    <Alignment variant='colCenter' className='w-full'>
                        <FormField type='text' variant="default" bg="light" {...register("caption")}
                            placeholder='Caption' />
                    </Alignment>

                    {errors.caption && <Message variant='error' disableOnContent="never" content={errors.caption.message} />}
                </Alignment>
                <Alignment variant='colLeft' className='w-full'>
                    <Alignment variant='colCenter' className='w-full'>
                        <label className={`w-36 h-24 rounded-2xl relative 
                        hover:cursor-pointer hover:scale-99 active:scale-98 hover:opacity-50 transition-all duration-150
                        ${!previewUrl ? "border-blue-600 border-4 border-dotted" : "border-black border-2"}`}>
                            {previewUrl ? (
                                <Image src={previewUrl} alt='Selected Image' fill className="object-cover" />
                            ) : (
                                <MdAddCircleOutline className='absolute top-1/2 left-1/2 -translate-1/2 text-blue-500 text-4xl' />
                            )}
                            {previewUrl &&
                                <div className='flex items-center justify-center text-4xl text-red-500 absolute
                                -top-3 -right-3 hover:cursor-pointer hover:opacity-55 hover:scale-99 active:scale-98
                                transition-all duration-150'
                                    onClick={onCancelPreviewClicked}>
                                    <RxCross2 />
                                </div>}
                            <FormField type="file" accept='image/*' variant="default" bg="light" {...register("file")}
                                className='w-full h-full hidden' disabled={!!previewUrl} />
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