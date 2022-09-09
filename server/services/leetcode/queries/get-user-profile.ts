const GET_USER_PROFILE = `
query getUserProfile($username: String!) {
  matchedUser(username: $username) {
    username
    submitStats: submitStatsGlobal {
      acSubmissionNum {
        difficulty
        count
        submissions
      }
    }
    profile {
      realName
      aboutMe
      company
      ranking
      reputation
      school
      skillTags
      userAvatar
    }
  }
}
`

export default GET_USER_PROFILE
