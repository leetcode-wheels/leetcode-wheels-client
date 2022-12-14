import Navbar from '../components/navbar/navbar'

const ComingSoon: React.FC = () => {
  return (
    <div className="relative bg-hero-gradient min-h-screen bg-zinc-900">
      <Navbar variant="hero" />
      <main className="container mx-auto max-w-lg pt-20 px-3 md:px-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl text-center font-semibold text-white">
          Coming Soon
        </h1>
        <p className="text-white text-center mt-20">
          You can help to contribute to this project by visiting
          <br /> the{' '}
          <a
            className="text-blue-500 underline"
            href="https://github.com/leetcode-wheels"
            target="_blank"
            rel="noreferrer"
          >
            Official Organization
          </a>
        </p>
      </main>
    </div>
  )
}

export default ComingSoon
