"use client";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ClerkProvider } from "@clerk/nextjs"
import React from 'react'

const queryClient: QueryClient = new QueryClient();
const ProvidersContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <QueryClientProvider client={queryClient}>
            <ClerkProvider>
                {children}
            </ClerkProvider>
        </QueryClientProvider>
    )
}

export default ProvidersContainer