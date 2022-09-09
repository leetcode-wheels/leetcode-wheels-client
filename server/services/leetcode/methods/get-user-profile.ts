import GET_USER_PROFILE from '../queries/get-user-profile'
import axios from '@/server/services/leetcode/config/axios.config'
import { UserProfileResponse } from './types'

const getUserProfile = async (username: string) =>
  axios
    .post('/graphql', {
      query: GET_USER_PROFILE,
      variables: { username },
    })
    .then((e) => e.data?.data?.matchedUser as UserProfileResponse)

export default getUserProfile
