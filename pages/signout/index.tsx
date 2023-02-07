import { NextPage } from 'next'
import { useEffect } from 'react'

import { trpc } from '@/config/trpc'
import { useRouter } from 'next/router'
import { deleteCookie } from 'cookies-next'

const SignoutPage: NextPage = () => {
  const { mutateAsync } = trpc.useMutation('auth.delete-cookie')
  const router = useRouter()

  useEffect(() => {
    mutateAsync().then(() => {
      deleteCookie('Set-Cookie')
      deleteCookie('auth')
      router.replace('/')
    })
  }, [mutateAsync, router])

  return <>Signin out...</>
}

export default SignoutPage
