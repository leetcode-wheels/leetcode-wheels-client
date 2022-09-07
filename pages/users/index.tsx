import { NextPage } from 'next'
import Image from 'next/image'
import clsx from 'classnames'

import useGetGlobalRanking from '../../hooks/useGetGlobalRanking'
import HomeLayout from '../../layouts/home'
import { RankingNode, UserProfile } from '../../services/leetcode/methods/types'
import Link from 'next/link'

import defaultAvatarUrl from '../../assets/default_avatar.webp'
import { useMemo } from 'react'

type UserRowProps = {
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
}

type UsersListProps = {
  rankingNodes: RankingNode[]
  isRefetching?: boolean
}

const UserElement: React.FC<UserRowProps> = ({ user, rankingInfo }) => {
  const roundedRating = useMemo(() => {
    return Number(rankingInfo.currentRating).toFixed(2)
  }, [rankingInfo?.currentRating])

  return (
    <li className="rounded-lg w-full py-2 px-4 inline-flex items-center gap-8 transition-shadow duration-150 hover:shadow-lg">
      <span>{rankingInfo.currentGlobalRanking}</span>
      {user?.profile?.userAvatar && (
        <Link href={`/user/${user.username}`} target="_blank">
          <a>
            <Image
              className="ml-4 rounded-full cursor-pointer"
              src={user.profile.userAvatar || defaultAvatarUrl}
              width={38}
              height={38}
              alt="profile-pic"
            />
          </a>
        </Link>
      )}{' '}
      <div className="w-full flex justify-between items-center">
        <div className="flex flex-col gap-1 font-semibold text-slate-800">
          <Link href={`/user/${user.username}`} target="_blank">
            <a className="inline-flex items-center">
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
    </li>
  )
}

const UsersList: React.FC<UsersListProps> = ({
  rankingNodes,
  isRefetching,
}) => {
  return (
    <ul
      className={clsx(
        'flex flex-col divide-y mt-10 container max-w-4xl mx-auto',
        isRefetching &&
          'animate-pulse transition-opacity duration-200 opacity-25'
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
        />
      ))}
    </ul>
  )
}

const UsersPage: NextPage = () => {
  const { data: globalRanking, isRefetching, refetch } = useGetGlobalRanking()

  return (
    <HomeLayout title="Global Ranking">
      <button onClick={() => refetch()}>Refetch</button>
      {globalRanking && (
        <UsersList
          rankingNodes={globalRanking?.rankingNodes}
          isRefetching={isRefetching}
        />
      )}
    </HomeLayout>
  )
}
export default UsersPage
