"use client";
//import OAuthButton from "@/components/auth/oAuthButton";
//import useCreateUser from "@/hooks/user/useCreateUser";
import { createUser } from "@/actions/userActions";
import { CreateUserFields, SignUpFields } from "@/libs/types";
import signUpSchema from "@/schemas/signupSchema";
import { useSignUp } from "@clerk/nextjs";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Message from "@/components/ui/general/message";
import Button from "@/components/ui/general/button";
import FormField from "@/components/ui/form/formField";
import FormContainer from "@/components/ui/form/formContainer";
import Alignment from "@/components/ui/general/alignment";
//import { Text, TextInput, TouchableOpacity, div } from "react-native";
const SignUpForm = () => {
    const { signUp, fetchStatus } = useSignUp();
    const [message, setMessage] = useState<string>("");
    const [isError, setIsError] = useState<boolean>(false);
    const router = useRouter();

    const isReady = fetchStatus === "idle" && signUp;

    const { handleSubmit, register, formState: { errors, isSubmitting } } = useForm<SignUpFields>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    });
    const { mutateAsync } = useMutation({
        mutationKey: ["createUser"],
        mutationFn: createUser
    })
    //const { mutateAsync } = useCreateUser();
    const onSubmit = async ({ username, email, password, confirmPassword }: SignUpFields) => {
        if (!isReady) {
            console.log("SIGNUP NOT READY!")
            return
        }

        try {
            const { error } = await signUp.password({
                emailAddress: email,
                password: password,
                //username: username
            });

            if (error) {
                //console.error("Clerk Error:", JSON.stringify(error, null, 2));
                if (isClerkAPIResponseError(error)) {
                    const clerkError = error.errors?.[0]?.longMessage || error.errors?.[0]?.message || "An error occurred";
                    setIsError(true);
                    setMessage(clerkError)
                    return;
                }
                else {
                    // Handle non-Clerk errors (network issues, etc.)
                    console.error("An unexpected error occurred", error);
                }
            }
            console.log("Clerk ID:", signUp.id)
            await mutateAsync({
                clerkId: signUp.id!,
                username: username,
                email: email
            });

            await signUp.verifications.sendEmailCode();

            setMessage("Success!");
            setIsError(false);
            console.log("SIGN UP SUCCESSFULL!")
            router.replace('/verify')
        }
        catch (err: any) {
            console.error("DEBUG ERROR:", err)
            const errorMessage = err.errors?.[0]?.message || "Something went wrong";
            setMessage(errorMessage);
            setIsError(true);
        }

    }
    return (
        <FormContainer variant="dark" onSubmit={handleSubmit(onSubmit)}>
            {/*USERNAME*/}
            <Alignment variant="colLeft" className="w-full">
                <FormField {...register("username")} type="text" variant="default" bg="light"
                    placeholder="Username" />
                {errors.username && <Message variant="error" content={errors.username.message} disableOnContent="never" />}
            </Alignment>
            <div className='flex items-center flex-col gap-2 w-full'>
                {/*EMAIL*/}
                <FormField {...register("email")} type="text" variant="default" bg="light"
                    placeholder="Email" />
                {errors.email && <Message variant="error" content={errors.email.message} disableOnContent="never" />}
            </div >
            <div className='flex items-center flex-col gap-2 w-full'>
                {/*PASSWORD*/}
                <FormField {...register("password")} type="text" variant="default" bg="light"
                    placeholder="Password" />
                {errors.password && <Message variant="error" content={errors.password.message} disableOnContent="never" />}
            </div >
            <div className='flex items-center flex-col gap-2 w-full'>
                {/*CONFIRM PASSWORD*/}
                <FormField {...register("confirmPassword")} type="text" variant="default" bg="light"
                    placeholder="Confirm Password" />
                {errors.confirmPassword && <Message variant="error" content={errors.confirmPassword.message} disableOnContent="never" />}
            </div >

            <Button className='flex items-center justify-center bg-neutral-900 py-3 px-5 
                rounded-[8px] w-36 border-2 ' disabled={isSubmitting}>
                <div className={isSubmitting ? "text-yellow-500" : "text-white"}>
                    {isSubmitting ? "Loading..." : "Submit"}
                </div>
            </Button>

            <Message variant={isError ? "error" : "success"} content={message} disableOnContent="md" />
            {/*<OAuthButton title="Sign Up With Google" strategy="oauth_google" />*/}
        </FormContainer >
    )
}

export default SignUpForm