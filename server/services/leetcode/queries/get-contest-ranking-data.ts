export const GET_CONTEST_RANKING_DATA = `
query getContestRankingData($username: String!) {
  userContestRanking(username: $username) {
    attendedContestsCount
    rating
    globalRanking
    __typename
  }
  userContestRankingHistory(username: $username) {
    contest {
      title
      startTime
      __typename
    }
    rating
    ranking
    __typename
  }
}
`

export default GET_CONTEST_RANKING_DATA
