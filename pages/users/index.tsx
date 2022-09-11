import { useMemo } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import Image from 'next/image'
import clsx from 'classnames'
import { trpc } from '@/config/trpc'

import Link from '../../components/link/link'
import Pagination from '../../components/pagination/pagination'
import HomeLayout from '../../layouts/home'
import defaultAvatarUrl from '../../assets/default_avatar.webp'
import {
  RankingNode,
  UserProfile,
} from '@/server/services/leetcode/methods/types'
import LoadingState from '@/components/loading-state'

type UserElementProps = {
  user: {
    username: string
    nameColor: string
    profile: UserProfile
  }
  rankingInfo: {
    currentGlobalRanking: number
    currentRating: string
    contestsAttended: number
    dataRegion: string
  }
  disabled?: boolean
}

type UsersListProps = {
  rankingNodes?: RankingNode[]
  isLoading?: boolean
}

const UserElement: React.FC<UserElementProps> = ({
  disabled,
  user,
  rankingInfo,
}) => {
  const roundedRating = useMemo(() => {
    return Number(rankingInfo.currentRating).toFixed(2)
  }, [rankingInfo?.currentRating])

  return (
    <li className="transition-colors duration-200 hover:bg-zinc-900 hover:bg-opacity-25">
      <div className="w-full py-2 px-4 inline-flex items-center gap-8 min-w-fit my-2">
        <div className="w-12 text-sm font-semibold text-right">
          {rankingInfo.currentGlobalRanking}
        </div>
        {user?.profile?.userAvatar && (
          <Link href={`/user/${user.username}`} disabled={disabled}>
            <a>
              <div className="z-0 relative w-12 h-12">
                <Image
                  className="ml-4 rounded-full cursor-pointer"
                  src={user.profile.userAvatar || defaultAvatarUrl}
                  layout="fill"
                  alt="profile-pic"
                  placeholder="blur"
                  blurDataURL={defaultAvatarUrl.blurDataURL}
                />
              </div>
            </a>
          </Link>
        )}{' '}
        <div className="w-full flex justify-between items-center">
          <div className="flex flex-col gap-1 font-semibold text-slate-800">
            <Link href={`/user/${user.username}`} disabled={disabled}>
              <a className="inline-flex items-center text-white">
                <h5>{user.username}</h5>
                <span className="ml-1 text-xs">({roundedRating})</span>
              </a>
            </Link>
            <span className="text-xs text-gray-400 font-medium">
              {rankingInfo.contestsAttended} contests attended
            </span>
          </div>
          <span className="text-sm">{user.profile.countryName}</span>
        </div>
      </div>
    </li>
  )
}

const UsersList: React.FC<UsersListProps> = ({
  rankingNodes = [],
  isLoading,
}) => {
  return (
    <div className="relative">
      <LoadingState show={isLoading} />
      <ul
        className={clsx(
          'flex flex-col mx-auto border border-gray-700 rounded-lg bg-zinc-800 divide-y divide-zinc-700',
          isLoading && 'transition-opacity duration-200 opacity-25'
        )}
      >
        {rankingNodes.map((rankingNode, id) => (
          <UserElement
            key={`${rankingNode.user.username}-${id}`}
            user={rankingNode.user}
            rankingInfo={{
              currentGlobalRanking: rankingNode.currentGlobalRanking,
              currentRating: rankingNode.currentRating,
              contestsAttended: JSON.parse(rankingNode.ranking).length,
              dataRegion: rankingNode.dataRegion,
            }}
            disabled={isLoading}
          />
        ))}
      </ul>
    </div>
  )
}

type UsersPageProps = {
  page: number
}

const UsersPage: NextPage<UsersPageProps> = ({ page }) => {
  const {
    data: globalRanking,
    isLoading,
    isRefetching,
  } = trpc.useQuery(['user.global-ranking', { page: page ?? 1 }], {
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })

  return (
    <HomeLayout title="Global Ranking" isLoading={isLoading}>
      <div className="mt-20 container max-w-4xl mx-auto">
        {globalRanking && (
          <h4 className="text-white text-sm font-medium mb-4">
            Total users:{' '}
            <strong className="ml-1">{globalRanking?.totalUsers}</strong>
          </h4>
        )}
        <UsersList
          rankingNodes={globalRanking?.rankingNodes}
          isLoading={isLoading || isRefetching}
        />
      </div>
      {globalRanking && (
        <Pagination
          page={page}
          className="mt-6 mb-8 justify-center md:justify-end"
          pageSize={globalRanking.userPerPage}
          count={globalRanking.totalUsers}
          basePath="/users"
        />
      )}
    </HomeLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      page: Number(ctx.query.page) || 1,
    },
  }
}

export default UsersPage
