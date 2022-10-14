import { NextPage } from 'next'
import HomeLayout from '@/layouts/home'
import Button from '@/components/button'
import TextField from '@/components/textfield'

const HowCanIContribute = () => {
  return (
    <div>
      <h1>How can I contribute to this project?</h1>
    </div>
  )
}

const Page: NextPage = () => {
  return (
    <HomeLayout title="Support">
      <div className="mt-20">
        <HowCanIContribute />
        <Button variant="primary">This is a button</Button>
        <TextField type="text" variant="xl" />
      </div>
    </HomeLayout>
  )
}

export default Page
