import Navbar from '@/components/navbar'

export const AuthLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="bg-neutral-900 min-h-screen">
      <Navbar />
      {children}
    </div>
  )
}

export default AuthLayout
