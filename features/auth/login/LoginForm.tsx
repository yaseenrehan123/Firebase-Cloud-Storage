"use client";

import { LoginFields } from "@/libs/types";
import loginSchema from "@/schemas/loginSchema";
import { useSignIn } from "@clerk/nextjs";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Message from "@/components/ui/general/message";
import Button from "@/components/ui/general/button";
import FormField from "@/components/ui/form/formField";
import FormContainer from "@/components/ui/form/formContainer";
import Link from "next/link";
import OAuthContainer from "@/features/general/OAuthContainer";

const LoginForm = () => {
    const { signIn, fetchStatus } = useSignIn();
    const [message, setMessage] = useState<string>("");
    const [isError, setIsError] = useState<boolean>(false);
    const router = useRouter();

    const isReady = fetchStatus === "idle" && signIn;

    const { handleSubmit, register, formState: { errors, isSubmitting } } = useForm<LoginFields>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const onSubmit = async ({ email, password }: LoginFields) => {
        if (!isReady) {
            console.log("SIGNIN NOT READY!");
            return;
        }

        try {

            const { error } = await signIn.create({
                identifier: email,
                password: password,
            });
            if (error) {
                if (isClerkAPIResponseError(error)) {
                    const clerkError = error.errors?.[0]?.longMessage || error.errors?.[0]?.message || "An error occurred";
                    setIsError(true);
                    setMessage(clerkError)
                    return;
                }
                else {

                    console.error("An unexpected error occurred", error);
                }
            }

            if (signIn.status === "complete") {

                await signIn.finalize();

                setMessage("Success!");
                setIsError(false);


                router.replace("/");
            } else {

                console.error("Sign-in status incomplete:", signIn.status);
                setMessage(`Sign-in incomplete status: ${signIn.status}`);
                setIsError(true);
            }
        } catch (err: any) {
            const errorMessage = err.errors?.[0]?.message || "Something went wrong";
            setMessage(errorMessage);
            setIsError(true);
            console.error(errorMessage)
        }
    };

    return (
        <FormContainer variant="dark" onSubmit={handleSubmit(onSubmit)}>
            {/* EMAIL */}
            <div className="flex items-center flex-col gap-2 w-full">
                <FormField
                    {...register("email")}
                    type="text"
                    variant="default"
                    bg="light"
                    placeholder="Email"
                />
                {errors.email && (
                    <Message variant="error" content={errors.email.message} disableOnContent="never" />
                )}
            </div>

            {/* PASSWORD */}
            <div className="flex items-center flex-col gap-2 w-full">
                <FormField
                    {...register("password")}
                    type="password"
                    variant="default"
                    bg="light"
                    placeholder="Password"
                />
                {errors.password && (
                    <Message variant="error" content={errors.password.message} disableOnContent="never" />
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

            <OAuthContainer />

            <Message variant={isError ? "error" : "success"} content={message} disableOnContent="md" />

            <div className="text-white flex items-center justify-center gap-2">
                <div>Dont have an account?</div>
                <strong className="text-purple-500">
                    <Link href={"/auth/signup"}>
                        Signup
                    </Link>
                </strong>
            </div>
        </FormContainer>
    );
};

export default LoginForm;