const GET_QUESTION_DETAILS = `
query getQuestionDetail($titleSlug: String!) {
  isCurrentUserAuthenticated
  question(titleSlug: $titleSlug) {
    questionId
    questionFrontendId
    questionTitle
    translatedTitle
    questionTitleSlug
    content
    translatedContent
    difficulty
    stats
    allowDiscuss
    contributors {
      username
      profileUrl
      __typename
    }
    similarQuestions
    mysqlSchemas
    randomQuestionUrl
    sessionId
    categoryTitle
    submitUrl
    interpretUrl
    codeDefinition
    sampleTestCase
    enableTestMode
    metaData
    enableRunCode
    enableSubmit
    judgerAvailable
    infoVerified
    envInfo
    urlManager
    article
    questionDetailUrl
    libraryUrl
    adminUrl
    companyTags {
      name
      slug
      translatedName
      __typename
    }
    companyTagStats
    topicTags {
      name
      slug
      translatedName
      __typename
    }
    __typename
  }
  interviewed {
    interviewedUrl
    companies {
      id
      name
      slug
      __typename
    }
    timeOptions {
      id
      name
      __typename
    }
    stageOptions {
      id
      name
      __typename
    }
    __typename
  }
  subscribeUrl
  isPremium
  loginUrl
}
`

export default GET_QUESTION_DETAILS
