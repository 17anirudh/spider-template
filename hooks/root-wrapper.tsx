"use client";

import type { ReactNode } from "react";
import { keepPreviousData, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

type Props = { children: ReactNode }

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity,
            placeholderData: keepPreviousData,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
        }
    }
})

export default function({ children }: Props) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}