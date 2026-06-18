"use client";

import type { ReactNode } from "react";
import { keepPreviousData, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools'
import AuthProvider, { useAuth } from './auth-provider'
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";

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
    const { isLoading, isUser } = useAuth();
    const router = useRouter();

    if (!isLoading && isUser) { router.replace('/dashboard') }

    return (
        <AuthProvider>
            <QueryClientProvider client={queryClient}>
                {isLoading ? <Loading /> : children}
                <ReactQueryDevtoolsPanel />
            </QueryClientProvider>
        </AuthProvider>
    )
}