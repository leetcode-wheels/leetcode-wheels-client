import { GetServerSideProps, NextPage } from 'next'
import Image from 'next/image'
import HomeLayout from '../../../layouts/home'

import Spinner from '../../../components/spinner'
import { trpc } from '@/config/trpc'
import {
  ContestRankingDataResponse,
  UserProfileResponse,
} from '@/server/services/leetcode/methods/types'
import ContestHistory from '@/components/contest-history'

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

export type MainContentProps = {
  contestRankingData: ContestRankingDataResponse
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const userData = user && (
    <div className="text-zinc-800 divide-y divide-gray-500">
      <div className="flex gap-4 px-4 py-2">
        <Image
          className="rounded-xl shrink-0"
          src={user.profile.userAvatar}
          alt="profile-pic"
          width="100%"
          height="100%"
        />
        <div className="flex-1">
          <h4 className="font-semibold h-6 line-clamp-1">
            {user.profile?.realName}
          </h4>
          <h5 className="">{user.username}</h5>
          <h5 className="mt-4 line-clamp-1">
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
    </div>
  )

  return (
    <div className="container bg-zinc-400 rounded-lg shadow-xl max-w-md">
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

const SideBar: React.FC<SideBarProps> = ({ user }) => {
  return (
    <aside className="w-full flex flex-col">
      <UserCard user={user} />
    </aside>
  )
}

const MainContent: React.FC<MainContentProps> = ({ contestRankingData }) => {
  return (
    <div className="w-full">
      {contestRankingData && (
        <ContestHistory data={contestRankingData.userContestRankingHistory} />
      )}
    </div>
  )
}

const UserDetailsPage: NextPage<UserDetailsPageProps> = ({ username }) => {
  const { data: user, isLoading: loadingUser } = trpc.useQuery(
    ['user.profile', { username }],
    {
      enabled: !!username.length,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  )
  const { data: contestRankingData, isLoading: loadingContestRankingData } =
    trpc.useQuery(['user.contest-ranking-data', { username }], {
      enabled: !!username.length,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    })

  const isLoading = loadingUser || loadingContestRankingData

  return (
    <HomeLayout isLoading={isLoading} loadingBlocksContent>
      <div className="flex flex-col md:flex-row gap-5">
        <div className="w-full md:w-96">{user && <SideBar user={user} />}</div>
        <div className="w-full md:w-main-content">
          {contestRankingData && (
            <MainContent contestRankingData={contestRankingData} />
          )}
        </div>
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
