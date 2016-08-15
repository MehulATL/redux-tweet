import { ref } from 'config/constants'

function saveToTweets (tweet) {
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

export function fetchUsersLikes (uid) {
  return ref.child(`usersLikes/${uid}`).once('value')
    .then((snapshot) => snapshot.val() || {})
}

export function saveToUsersLikes (uid, tweetId) {
  return ref.child(`usersLikes/${uid}/${tweetId}`)
    .set(true)
}

export function deleteFromUsersLikes (uid, tweetId) {
  return ref.child(`usersLikes/${uid}/${tweetId}`)
    .set(null)
}

export function incrementLikeCount (tweetId) {
  return ref.child(`likeCount/${tweetId}`)
    .transaction((currentVal = 0) => currentVal++)
}

export function decrementLikeCount (tweetId) {
  return ref.child(`likeCount/${tweetId}`)
    .transaction((currentVal = 0) => currentVal--)
}

export function fetchUser (uid) {
  return ref.child(`users/${uid}`).once('value')
  .then((snapshot) => snapshot.val())
}

export function fetchUserTweets (uid) {
  return ref.child(`usersTweets/${uid}`).once('value')
    .then((snapshot) => snapshot.val() || {})
}
