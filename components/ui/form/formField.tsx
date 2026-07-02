import { cn } from '@/libs/utils'
import type { FormFieldProps } from '@/libs/types'
import { cva } from 'class-variance-authority'
import React from 'react'

const FormField = ({ variant, bg, className, ...props }: FormFieldProps) => {
    return (
        <input {...props} className={cn(variants({ variant, bg }), className)} />
    )
}

const variants = cva('text-center rounded-[8px] h-8 focus:outline-2 outline-neutral-400 w-full', {
    variants: {
        variant: {
            default: 'max-w-xs',
            small: 'max-w-sm',
            large: 'max-w-lg'
        },
        bg: {
            light: 'bg-white text-black',
            dark: 'bg-gray-950 text-white'
        }
    },
    defaultVariants: {
        variant: 'default',
        bg: 'light'
    }
})

export default FormField