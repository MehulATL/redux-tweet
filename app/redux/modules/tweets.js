import { saveTweet } from 'helpers/api'
import { closeModal } from './modal'
import { addSingleUsersTweet } from './usersTweets'

const FETCHING_TWEET = 'FETCHING_TWEET'
const FETCHING_TWEET_ERROR = 'FETCHING_TWEET_ERROR'
const FETCHING_TWEET_SUCCESS = 'FETCHING_TWEET_SUCCESS'
const ADD_TWEET = 'ADD_TWEET'
const ADD_MULTIPLE_TWEETS = 'ADD_MULTIPLE_TWEETS'
const REMOVE_FETCHING = 'REMOVE_FETCHING'

function fetchingTweet () {
  return {
    type: FETCHING_TWEET
  }
}

function fetchingTweetError (error) {
  console.warn(error)
  return {
    type: FETCHING_TWEET_ERROR,
    error: 'Error fetching Tweet'
  }
}

function fetchingTweetSuccess (tweet) {
  return {
    type: FETCHING_TWEET_SUCCESS,
    tweet
  }
}

function removeFetching () {
  return {
    type: REMOVE_FETCHING
  }
}

function addTweet (tweet) {
  return {
    type: ADD_TWEET,
    tweet
  }
}

export function addMultipleTweets (tweets) {
  return {
    type: ADD_MULTIPLE_TWEETS,
    tweets
  }
}

export function tweetFanout (tweet) {
  return function (dispatch, getState) {
    const uid = getState().users.authedId
    saveTweet(tweet)
      .then((tweetWithId) => {
        dispatch(addTweet(tweetWithId))
        dispatch(closeModal())
        dispatch(addSingleUsersTweet(uid, tweetWithId.tweetId))
      })
      .catch((err) => {
        console.warn('Error in tweetFanout', err)
      })
  }
}

const initialState = {
  isFetching: true,
  error: ''
}

export default function tweets (state = initialState, action) {
  switch (action.type) {
    case FETCHING_TWEET :
      return {
        ...state,
        isFetching: true
      }
    case ADD_TWEET :
    case FETCHING_TWEET_SUCCESS :
      return {
        ...state,
        error: '',
        isFetching: false,
        [action.tweet.tweetId]: action.tweet
      }
    case FETCHING_TWEET_ERROR :
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    case REMOVE_FETCHING :
      return {
        ...state,
        error: '',
        isFetching: false
      }
    case ADD_MULTIPLE_TWEETS :
      return {
        ...state,
        ...action.tweets
      }
    default :
      return state
  }
}
