import Navbar from '../components/navbar/navbar'

export type HomeLayoutProps = JSX.IntrinsicElements['div'] & {
  title?: string
}

const HomeLayout: React.FC<HomeLayoutProps> = ({ title, children }) => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="py-8 max-w-7xl mx-auto">
        <div className="px-4 sm:px-16">
          <h1 className="font-semibold text-slate-600 text-4xl">{title}</h1>
          {children}
        </div>
      </main>
    </div>
  )
}

export default HomeLayout
