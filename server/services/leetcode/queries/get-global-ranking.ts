const GET_GLOBAL_RANKING = `
query getGlobalRanking ($page: Int) {
  globalRanking(page: $page) {
    totalUsers
    userPerPage
    myRank {
      ranking
      currentGlobalRanking
      currentRating
      dataRegion
      user {
        nameColor
        activeBadge {
          displayName
          icon
          __typename
        }
        __typename
      }
      __typename
    }
    rankingNodes {
      ranking
      currentRating
      currentGlobalRanking
      dataRegion
      user {
        username
        nameColor
        activeBadge {
          displayName
          icon
          __typename
        }
        profile {
          userAvatar
          countryCode
          countryName
          realName
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
}
`

export default GET_GLOBAL_RANKING
