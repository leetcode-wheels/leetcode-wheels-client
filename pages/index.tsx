import { NextPage } from 'next'

import Navbar from '@/components/navbar'
import NewHero from './_components/hero'
import Features from './_components/features'

const Home: NextPage = () => {
  return (
    <div className="relative min-h-screen">
      <Navbar variant="hero" />
      <NewHero />
      <Features />
    </div>
  )
}

export default Home
