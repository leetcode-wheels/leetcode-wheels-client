import LoadingState from '@/components/loading-state'
import Navbar from '../components/navbar/navbar'

export type HomeLayoutProps = JSX.IntrinsicElements['div'] & {
  title?: string
  isLoading?: boolean
  loadingBlocksContent?: boolean
}
const HomeLayout: React.FC<HomeLayoutProps> = ({
  isLoading,
  loadingBlocksContent = true,
  title,
  children,
}) => {
  return (
    <div className="min-h-screen bg-neutral-900">
      <Navbar />
      {(!loadingBlocksContent || !isLoading) && (
        <main className="py-8 max-w-7xl mx-auto">
          <div className="px-4 lg:px-16">
            <h1 className="font-semibold text-4xl text-white">{title}</h1>
            {children}
          </div>
        </main>
      )}
      <LoadingState show={isLoading} />
    </div>
  )
}

export default HomeLayout
