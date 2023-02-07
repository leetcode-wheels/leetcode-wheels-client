import { NextPage } from 'next'

import Navbar from '@/components/navbar'
import NewHero from './_components/hero'

const Home: NextPage = () => {
  return (
    <div className="relative min-h-screen">
      <Navbar variant="hero" />
      <NewHero />
    </div>
  )
}

export default Home
