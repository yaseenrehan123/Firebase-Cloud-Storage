import { cn } from '@/libs/utils'
import type { ButtonProps } from '@/libs/types'
import { cva } from 'class-variance-authority'
import React from 'react'

const Button = ({ variant, children, className, ...props }: ButtonProps) => {
    return (
        <button {...props} className={cn(variants({ variant }), className)}>
            {children}
        </button>
    )
}

const variants = cva(`text-center flex items-center justify-center hover:cursor-pointer transition-all duration-150
    w-26 h-12 rounded-[8px] hover:scale-98 hover:opacity-90 font-roboto text-black active:scale-96`, {
    variants: {
        variant: {
            default: 'bg-white',
            outline: 'outline-black outline-2'
        }
    },
    defaultVariants: {
        variant: 'default',
    }
})

export default Button