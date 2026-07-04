import { uploadThingFileRouter } from "@/app/api/uploadthing/core";
import createUserSchema from "@/schemas/createUserSchema";
import loginSchema from "@/schemas/loginSchema";
import signUpSchema from "@/schemas/signupSchema";
import uploadFormSchema from "@/schemas/uploadFormSchema";
import verificationSchema from "@/schemas/verificationSchema";
import z from "zod";
//SHADCN COMPONENTS
export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'default' | 'outline'
}
export type FormContainerProps = React.HTMLAttributes<HTMLFormElement> & {
    variant?: 'light' | 'dark'
};
export type FormFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
    variant?: 'default' | 'small' | 'large',
    bg?: "light" | "dark"
}
export type AlignmentProps = React.HTMLAttributes<HTMLDivElement> & {
    variant?: 'rowLeft' | 'rowCenter' | 'rowRight' | 'colLeft' | 'colCenter' | 'colRight',
    gap?: 'sm' | 'md' | 'lg'
};
export type MessageProps = React.HTMLAttributes<HTMLDivElement> & {
    variant?: 'default' | 'success' | 'loading' | 'error',
    disableOnContent?: 'never' | 'sm' | 'md' | 'lg',
    content?: String
}
//INFERS
export type UploadFormFields = z.infer<typeof uploadFormSchema>
export type SignUpFields = z.infer<typeof signUpSchema>
export type VerificationFields = z.infer<typeof verificationSchema>
export type LoginFields = z.infer<typeof loginSchema>
export type CreateUserFields = z.infer<typeof createUserSchema>
//GENERAL
export type UploadThingFileRouter = typeof uploadThingFileRouter;