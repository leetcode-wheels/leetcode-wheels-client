import Navbar from '../components/navbar/navbar'

export type HomeLayoutProps = JSX.IntrinsicElements['div']

const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mt-8 mx-2 sm:mx-4">{children}</main>
    </div>
  )
}

export default HomeLayout
