import { uploadThingFileRouter } from "@/app/api/uploadthing/core";
import createUserSchema from "@/schemas/createUserSchema";
import loginSchema from "@/schemas/loginSchema";
import signUpSchema from "@/schemas/signupSchema";
import uploadFormSchema from "@/schemas/uploadFormSchema";
import verificationSchema from "@/schemas/verificationSchema";
import { LinkProps } from "next/link";
import type { OAuthStrategy } from "@clerk/shared/types"
import z from "zod";
import createPostSchema from "@/schemas/createPostSchema";
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
export type NavlinkProps = React.HTMLAttributes<HTMLDivElement> & Partial<LinkProps> & {
    variant?: 'mainbar' | 'sidebar',
    navigateRoute?: boolean
}
export type ResponsiveProps = React.HTMLAttributes<HTMLDivElement> & ResponsiveVariants;
export type ProfileAvatarProps = React.HTMLAttributes<HTMLDivElement> & {
    variant?: 'sidebar' | 'mainbar',
    username?: string,
    avatarUrl?: string,
}
export type ColumnDividerProps = React.HTMLAttributes<HTMLDivElement> & {
    variant?: 'thin' | 'medium' | 'thick'
}
//COMPONENT PROPS
export type OAuthButtonProps = {
    title: string
    strategy: OAuthStrategy
}
//INFERS
export type UploadFormFields = z.infer<typeof uploadFormSchema>
export type SignUpFields = z.infer<typeof signUpSchema>
export type VerificationFields = z.infer<typeof verificationSchema>
export type LoginFields = z.infer<typeof loginSchema>
export type CreateUserFields = z.infer<typeof createUserSchema>
export type CreatePostFields = z.infer<typeof createPostSchema>
//GENERAL
export type UploadThingFileRouter = typeof uploadThingFileRouter;
export type ResponsiveVariants = {
    display?: 'block' | 'inline' | 'inlineBlock' | 'flex' | 'inlineFlex' | 'grid' | 'hidden',
    sm?: 'default' | 'block' | 'hidden' | 'flex' | 'inlineBlock',
    md?: 'default' | 'block' | 'hidden' | 'flex' | 'inlineBlock',
    lg?: 'default' | 'block' | 'hidden' | 'flex' | 'inlineBlock',
}
//STORES
export type SidebarStore = {
    enabled: boolean,
    setEnabled: (newVal: boolean) => void
}
export type DeleteAccountConfirmationStore = {
    enabled: boolean,
    setEnabled: (val: boolean) => void
}
