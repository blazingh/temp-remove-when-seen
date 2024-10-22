"use client"

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

// Create a client
export const queryClient = new QueryClient()

export default function TanstackQueryContextProvider(
  {
    children
  }: {
    children: React.ReactNode
  }
) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
