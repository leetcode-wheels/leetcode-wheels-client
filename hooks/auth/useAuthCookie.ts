import { getCookie } from 'cookies-next'
import { useEffect, useState } from 'react'

const useAuthCookie = () => {
  const [cookie, setCookie] = useState<string | null>(null)

  useEffect(() => {
    const cookieVal = getCookie('auth')?.toString()
    if (cookieVal) {
      setCookie(cookieVal)
    }
  }, [])

  return {
    isAuthenticated: !!cookie,
    cookie,
  }
}

export default useAuthCookie
