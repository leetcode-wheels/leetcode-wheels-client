import type { AppProps } from 'next/app'
import { QueryClientProvider } from 'react-query'
import { Toaster } from 'react-hot-toast'

import queryClient from '../config/react-query.config'
import '../styles/globals.css'
import Head from 'next/head'

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

export default MyApp
