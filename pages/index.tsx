import { NextPage } from 'next'
import Button from '../components/button'
import HomeLayout from '../layouts/home'

const Home: NextPage = () => {
  return (
    <HomeLayout>
      <div className="pt-40 w-full">
        <Button variant="primary" size="xl" isLoading className="mx-auto">
          Im a button
        </Button>
      </div>
    </HomeLayout>
  )
}

export default Home
