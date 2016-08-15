import { fetchUserTweets } from 'helpers/api'
import { addMultipleTweets } from './tweets'

const FETCHING_USERS_TWEETS = 'FETCHING_USERS_TWEETS'
const FETCHING_USERS_TWEETS_ERROR = 'FETCHING_USERS_TWEETS_ERROR'
const FETCHING_USERS_TWEETS_SUCCESS = 'FETCHING_USERS_TWEETS_SUCCESS'
const ADD_SINGLE_USERS_TWEET = 'ADD_SINGLE_USERS_TWEET'

function fetchingUsersTweets (uid) {
  return {
    type: FETCHING_USERS_TWEETS,
    uid
  }
}

function fetchingUsersTweetsError (error) {
  console.warn(error)
  return {
    type: FETCHING_USERS_TWEETS_ERROR,
    error: 'Error fetching Users Tweet Ids'
  }
}

function fetchingUsersTweetsSuccess (uid, tweetIds, lastUpdated) {
  return {
    type: FETCHING_USERS_TWEETS_SUCCESS,
    uid,
    tweetIds,
    lastUpdated
  }
}

export function addSingleUsersTweet (uid, tweetId) {
  return {
    type: ADD_SINGLE_USERS_TWEET,
    uid,
    tweetId
  }
}

export function fetchAndHandleUserTweets (uid) {
  return function (dispatch) {
    dispatch(fetchingUsersTweets())

    fetchUserTweets(uid)
      .then(tweets => dispatch(addMultipleTweets(tweets)))
      .then(({tweets}) => dispatch(
        fetchingUsersTweetsSuccess(
          uid,
          Object.keys(tweets).sort((a, b) => tweets[b].timestamp - tweets[a].timestamp),
          Date.now()
        )
      ))
      .catch(err => dispatch(fetchingUsersTweetsError(err)))
  }
}

const initialUsersTweetState = {
  lastUpdated: 0,
  tweetIds: []
}

function usersTweet (state = initialUsersTweetState, action) {
  switch (action.type) {
    case ADD_SINGLE_USERS_TWEET :
      return {
        ...state,
        tweetIds: state.tweetIds.concat([action.tweetId])
      }
    default :
      return state
  }
}

const initialState = {
  isFetching: true,
  error: ''
}

export default function usersTweets (state = initialState, action) {
  switch (action.type) {
    case FETCHING_USERS_TWEETS :
      return {
        ...state,
        isFetching: true
      }
    case FETCHING_USERS_TWEETS_ERROR :
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    case FETCHING_USERS_TWEETS_SUCCESS :
      return {
        ...state,
        isFetching: false,
        error: '',
        [action.uid]: {
          lastUpdated: action.lastUpdated,
          tweetIds: action.tweetIds
        }
      }
    case ADD_SINGLE_USERS_TWEET :
      return typeof state[action.uid] === 'undefined'
        ? state
        : {
          ...state,
          isFetching: false,
          error: '',
          [action.uid]: usersTweet(state[action.uid], action)
        }
    default :
      return state
  }
}
