"use client";

import { VerificationFields } from "@/libs/types";
import verificationSchema from "@/schemas/verificationSchema";
import { useSignUp } from "@clerk/nextjs";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Message from "@/components/ui/general/message";
import Button from "@/components/ui/general/button";
import FormField from "@/components/ui/form/formField";
import FormContainer from "@/components/ui/form/formContainer";
const VerifyForm = () => {
    const { signUp, fetchStatus } = useSignUp();
    const [message, setMessage] = useState<string>("");
    const [isError, setIsError] = useState<boolean>(false);
    const router = useRouter();

    const isReady = fetchStatus === "idle" && signUp;

    const { handleSubmit, register, formState: { errors, isSubmitting } } = useForm<VerificationFields>({
        resolver: zodResolver(verificationSchema),
        defaultValues: {
            code: ""
        }
    });

    const onSubmit = async (data: VerificationFields) => {
        if (!isReady) {
            console.log("VERIFICATION NOT READY YET!");
            return;
        }

        try {
            // Check the email verification code submitted by the user
            const { error } = await signUp.verifications.verifyEmailCode({
                code: data.code,
            });
            if (error) {
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
            // If the signup state changes to complete, set the active session
            if (signUp.status === "complete") {
                await signUp.finalize();

                setMessage("Success!");
                setIsError(false);

                // Redirect user to the homepage or onboarding
                router.replace("/");
            } else {
                console.error("Sign-up not complete. Current status:", signUp.status);
                setMessage(`Status incomplete: ${signUp.status}`);
                setIsError(true);
            }
        } catch (err: any) {
            const errorMessage = err.errors?.[0]?.message || "Something went wrong";
            setMessage(errorMessage);
            setIsError(true);
            console.error(err);
        }
    };

    return (
        <FormContainer variant="dark" onSubmit={handleSubmit(onSubmit)}>
            {/* CODE FIELD */}
            <div className="flex items-center flex-col gap-2 w-full">
                <FormField
                    {...register("code")}
                    type="text"
                    variant="default"
                    bg="light"
                    placeholder="Code"
                />
                {errors.code && (
                    <Message variant="error" content={errors.code.message} disableOnContent="never" />
                )}
            </div>

            {/* SUBMIT BUTTON */}
            <Button
                className="flex items-center justify-center bg-neutral-900 py-3 px-5 rounded-[8px] w-36 border-2"
                disabled={isSubmitting}
            >
                <div className={isSubmitting ? "text-yellow-500" : "text-white"}>
                    {isSubmitting ? "Loading..." : "Submit"}
                </div>
            </Button>

            {/* STATUS MESSAGE */}
            <Message variant={isError ? "error" : "success"} content={message} disableOnContent="md" />
        </FormContainer>
    );
};

export default VerifyForm;