import { NextPage } from 'next'
import { useState } from 'react'
import { useRouter } from 'next/router'

import AuthLayout from '@/layouts/auth'
import LeetCodeLogo from '@/components/leetcode-logo/leetcode-logo'
import TextField from '@/components/textfield/textfield'
import Button from '@/components/button/button'
import { toast } from 'react-hot-toast'
import { trpc } from '@/config/trpc'

const Form = () => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { mutateAsync } = trpc.useMutation(['auth.set-cookie'])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true)
    e.preventDefault()
    mutateAsync({ cookie: e.target[0].value })
      .then(() => router.push('/'))
      .catch((err) => {
        console.error(err)
        toast.error('There was an error, check the console...')
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor="cookie"
          className="block text-sm font-medium text-gray-900"
        >
          Cookie value
        </label>
        <TextField
          className="mt-1"
          name="cookie"
          placeholder="Your session cookie"
        />
      </div>
      <div>
        <Button
          className="w-full"
          variant="primary"
          type="submit"
          textCentered
          disabled={isLoading}
          isLoading={isLoading}
        >
          Sign in
        </Button>
      </div>
    </form>
  )
}

const SigninPage: NextPage = () => {
  return (
    <AuthLayout>
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <LeetCodeLogo className="mx-auto h-12 w-auto" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-200">
            Sign in with your cookie
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-zinc-600 py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <Form />
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}

export default SigninPage
