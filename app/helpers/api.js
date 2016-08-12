import { ref } from 'config/constants'

function saveToTweets (tweet) {
  // We're generating the tweetId by pushing nothing to firebase, and returning the key
  const tweetId = ref.child('tweets').push().key
  const tweetPromise = ref.child(`tweets/${tweetId}`)
    .set({...tweet, tweetId})

  return {
    tweetId,
    tweetPromise
  }
}

function saveToUsersTweets (tweet, tweetId) {
  return ref.child(`usersTweets/${tweet.uid}/${tweetId}`)
    .set({...tweet, tweetId})
}

function saveLikeCount (tweetId) {
  return ref.child(`likeCount/${tweetId}`)
    .set(0)
}

export function saveTweet (tweet) {
  const { tweetId, tweetPromise } = saveToTweets(tweet)

  return Promise.all([
    tweetPromise,
    saveToUsersTweets(tweet, tweetId),
    saveLikeCount(tweetId)
  ]).then(() => ({...tweet, tweetId}))
}

export function listenToTimeline (cb, errCb) {
  ref.child('tweets').on('value', (snapshot) => {
    const timeline = snapshot.val() || {}
    const sortedIds = Object.keys(timeline).sort((a, b) => timeline[b].timestamp - timeline[a].timestamp)
    cb({timeline, sortedIds})
  }, errCb)
}
