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

export const contestDataValidator = z.object({
  contest: z.object({
    title: z.string(),
    startTime: z.number(),
  }),
  rating: z.number(),
  ranking: z.number(),
})

export const contestRankingDataResponseValidator = z.object({
  userContestRanking: z.object({
    attendedContestsCount: z.number(),
    rating: z.number(),
    globalRanking: z.number(),
  }),
  userContestRankingHistory: z.array(contestDataValidator),
})

export const topicTagValidator = z.object({
  name: z.string(),
  slug: z.string(),
})

export const questionDifficultyValidator = z.enum(['Easy', 'Medium', 'Hard'])

export const questionValidator = z.object({
  questionId: z.string(),
  questionTitle: z.string(),
  content: z.string(),
  difficulty: questionDifficultyValidator,
  submitUrl: z.string(),
  topicTags: z.array(topicTagValidator),
  stats: z.string(),
})

export const questionDetailsValidator = z.object({
  isCurrentUserAuthenticated: z.boolean(),
  question: questionValidator,
  isPremium: z.boolean(),
})

export const problemseteQuestionValidator = z.object({
  frontendQuestionId: z.string(),
  acRate: z.number(),
  difficulty: questionDifficultyValidator,
  title: z.string(),
  titleSlug: z.string(),
  topicTags: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      slug: z.string(),
    })
  ),
})

export const problemsetQuestionListValidator = z.object({
  total: z.number(),
  questions: z.array(problemseteQuestionValidator),
})
