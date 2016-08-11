// denormalize data for faster access,
// and so you dont have to pull down huge
//  data stucture and query it on frontend

/users
  uid
    name
    uid
    avatar

/tweets
  tweetId
    avatar
    tweetId
    name
    text
    timestamp
    uid

/likeCount
  tweetId

/userTweets
  uid
    tweetId
      avatar
      tweetId
      name
      text
      timestamp
      uid

/replies
  tweetId
    replyId
      name
      comment
      uid
      timestamp
      avatar

/usersLikes
  uid
    tweetId
