import { gql } from '@apollo/client'

const GET_CONTEST_RANKING_DATA = gql`
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
