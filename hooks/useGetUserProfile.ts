import useQuery from '../config/use-query.config'
import { getUserProfile } from '../services/leetcode/methods'
import { GET_USER_PROFILE } from './querykeys'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useGetUserProfile = (username: string, options?: any) =>
  useQuery(
    [GET_USER_PROFILE, username],
    () => getUserProfile(username),
    options
  )

export default useGetUserProfile
