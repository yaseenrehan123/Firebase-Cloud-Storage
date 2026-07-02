"use client";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'

const queryClient: QueryClient = new QueryClient();
const ProvidersContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}

export default ProvidersContainer