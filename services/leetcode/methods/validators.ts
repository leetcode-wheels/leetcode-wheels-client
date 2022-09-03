import z from 'zod'

const userProfileResponseValidator = z.object({
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
  profile: z.object({
    realName: z.string(),
    aboutMe: z.string(),
    company: z.string(),
    countryName: z.string(),
    ranking: z.number(),
    reputation: z.number(),
    school: z.string(),
    skillTags: z.array(z.string()),
    userAvatar: z.string().url(),
  }),
})

export { userProfileResponseValidator }
