import type { AppProps } from 'next/app'
import { QueryClientProvider } from 'react-query'
import { Toaster } from 'react-hot-toast'
import { withTRPC } from '@trpc/next'
import Head from 'next/head'

import queryClient from '@/config/react-query.config'
import { AppRouter } from '@/server/router'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>Leetcode Wheels</title>
      </Head>
      <Toaster
        position="top-left"
        containerStyle={{
          top: 40,
          left: 40,
          bottom: 40,
          right: 40,
        }}
        toastOptions={{
          error: {
            className: '!bg-red-50',
          },
        }}
      />
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}

export default withTRPC<AppRouter>({
  config() {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/trpc`
      : 'http://localhost:3000/api/trpc'
    return {
      url,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    }
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false,
})(MyApp)
