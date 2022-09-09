import z from 'zod'

export const userProfileObjectValidator = z.object({
  realName: z.string(),
  aboutMe: z.string(),
  company: z.string(),
  countryName: z.string(),
  ranking: z.number(),
  reputation: z.number(),
  school: z.string(),
  skillTags: z.array(z.string()),
  userAvatar: z.string().url(),
})

export const rankingNodeValidator = z.object({
  ranking: z.string(),
  currentRating: z.string(),
  currentGlobalRanking: z.number(),
  dataRegion: z.string(),
  user: z.object({
    username: z.string(),
    nameColor: z.string(),
    profile: userProfileObjectValidator,
  }),
})

export const userProfileResponseValidator = z.object({
  username: z.string(),
  submitStats: z.object({
    acSubmissionNum: z.array(
      z.object({
        difficulty: z.string(),
        count: z.number(),
        submissions: z.number(),
      })
    ),
  }),
  profile: userProfileObjectValidator,
})

export const globalRankingResponseValidator = z.object({
  totalUsers: z.number(),
  userPerPage: z.number(),
  myRank: z.number().nullable(),
  rankingNodes: z.array(rankingNodeValidator),
})
