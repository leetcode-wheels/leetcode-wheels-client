import { NextPage } from 'next'
import clsx from 'classnames'

import Navbar from '@/components/navbar'

const HeroSection: React.FC = () => {
  return (
    <section className="">
      <div className="pt-32 pb-20 px-4 sm:pl-8">
        <div
          className={clsx(
            'w-full sm:w-1/2 rounded-lg px-4 py-4',
            'transition-shadow duration-200 bg-opacity-5 bg-white border border-opacity-50 shadow-around-sm hover:shadow-around-md shadow-blue-900 hover:shadow-blue-900 border-blue-500'
          )}
        >
          <h1 className="text-white font-bold text-8xl leading-tight">
            This is Leetcode, <br />
            but... <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-cyan-800">
              with wheels.
            </span>
          </h1>
        </div>
      </div>
    </section>
  )
}

const Home: NextPage = () => {
  return (
    <div className="relative bg-zinc-900 min-h-screen bg-hero-gradient">
      <Navbar variant="hero" />
      <HeroSection />
    </div>
  )
}

export default Home
