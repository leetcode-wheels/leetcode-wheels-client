import { GetServerSideProps, NextPage } from 'next'
import Image from 'next/image'
import HomeLayout from '../../../layouts/home'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import Spinner from '../../../components/spinner'
import { trpc } from '@/config/trpc'
import { UserProfileResponse } from '@/server/services/leetcode/methods/types'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  maintainAspectRatio: false,
}

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']

export const data = {
  labels,
  datasets: [
    {
      data: [1500, 1767, 1630, 1580, 1500, 1610, 1690, 1723, 1815],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
}

export type UserCardProps = JSX.IntrinsicElements['div'] & {
  user?: UserProfileResponse
}

export type RatingCardProps = JSX.IntrinsicElements['div'] & {
  a?: boolean
}

export type UserDetailsPageProps = {
  username: string
}

export type SideBarProps = {
  user: UserProfileResponse
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const userData = user && (
    <>
      <div className="flex gap-4 px-4 py-2">
        <Image
          className="rounded-xl shrink-0"
          src={user.profile.userAvatar}
          alt="profile-pic"
          width="100%"
          height="100%"
        />
        <div className="flex-1">
          <h4 className="font-semibold h-6">{user.profile?.realName}</h4>
          <h5 className="">{user.username}</h5>
          <h5 className="mt-4">
            Ranking: {user.profile.ranking}{' '}
            <span className="font-semibold">(worlwide)</span>
          </h5>
        </div>
      </div>
      <div className="flex justify-between px-4 py-2">
        <span>Location</span>
        <span>{user.profile.countryName}</span>
      </div>
      <div className="flex justify-between px-4 py-2">
        <span>Company</span>
        <span>{user.profile.company}</span>
      </div>
      <div className="flex justify-between px-4 py-2">
        <span>Education</span>
        <span>{user.profile.school}</span>
      </div>
    </>
  )
  return (
    <div className="container bg-white rounded-lg shadow-xl min-w-max max-w-sm md:max-w-md divide-y divide-gray-300">
      {user ? (
        userData
      ) : (
        <div className="h-40 flex items-center justify-center">
          <Spinner size="sm" />
        </div>
      )}
    </div>
  )
}

const RatingCard: React.FC<RatingCardProps> = ({}) => {
  return (
    <div className="container h-40 bg-white rounded-lg shadow-xl max-w-lg px-4 py-8">
      <h4>Contest Rating: 1687pt</h4>
      <Line options={options} data={data} height="200px" width="200px" />
    </div>
  )
}

const SideBar: React.FC<SideBarProps> = ({ user }) => {
  return (
    <div className="w-1/3">
      <UserCard user={user} />
    </div>
  )
}

const MainContent = () => {
  return (
    <div className="w-2/3">
      <RatingCard />
    </div>
  )
}

const UserDetailsPage: NextPage<UserDetailsPageProps> = ({ username }) => {
  const { data: user, isLoading } = trpc.useQuery(
    ['user.profile', { username }],
    {
      enabled: !!username.length,
    }
  )

  if (isLoading) {
    return null
  }

  return (
    <HomeLayout>
      <div className="flex flex-col md:flex-row w-full gap-6">
        {user && <SideBar user={user} />}
        <MainContent />
      </div>
    </HomeLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const username = ctx.params?.username
  return {
    props: { username: username as string },
  }
}

export default UserDetailsPage
