import z from 'zod'

import {
  globalRankingResponseValidator,
  rankingNodeValidator,
  userProfileObjectValidator,
  userProfileResponseValidator,
} from './validators'

export type UserProfile = z.infer<typeof userProfileObjectValidator>

export type UserProfileResponse = z.infer<typeof userProfileResponseValidator>

export type GlobalRankingResponse = z.infer<
  typeof globalRankingResponseValidator
>

export type RankingNode = z.infer<typeof rankingNodeValidator>
