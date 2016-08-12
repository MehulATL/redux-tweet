import { addListener } from 'redux/modules/listeners'
import { listenToTimeline } from 'helpers/api'
import { addMultipleTweets } from 'redux/modules/tweets'

const SETTING_TIMELINE_LISTENER = 'SETTING_TIMELINE_LISTENER'
const SETTING_TIMELINE_LISTENER_ERROR = 'SETTING_TIMELINE_LISTENER_ERROR'
const SETTING_TIMELINE_LISTENER_SUCCESS = 'SETTING_TIMELINE_LISTENER_SUCCESS'
const ADD_NEW_TWEET_ID_TO_TIMELINE = 'ADD_NEW_TWEET_ID_TO_TIMELINE'
const RESET_NEW_TWEETS_AVAILABLE = 'RESET_NEW_TWEETS_AVAILABLE'

function settingTimelineListener () {
  return {
    type: SETTING_TIMELINE_LISTENER
  }
}

function settingTimelineListenerError (error) {
  console.warn(error)
  return {
    type: SETTING_TIMELINE_LISTENER_ERROR,
    error: 'Error fetching timeline.'
  }
}

function settingTimelineListenerSuccess (tweetIds) {
  return {
    type: SETTING_TIMELINE_LISTENER_SUCCESS,
    tweetIds
  }
}

function addNewTweetIdToTimeline (tweetId) {
  return {
    type: ADD_NEW_TWEET_ID_TO_TIMELINE,
    tweetId
  }
}

export function resetNewTweetsAvailable () {
  return {
    type: RESET_NEW_TWEETS_AVAILABLE
  }
}

export function setAndHandleTimelineListener () {
  let initialFetch = true
  return function (dispatch, getState) {
    if (getState().listeners.timeline) return

    dispatch(addListener('timeline'))
    dispatch(settingTimelineListener())

    listenToTimeline(({feed, sortedIds}) => {
      dispatch(addMultipleTweets(timeline))
      initialFetch
        ? dispatch(settingTimelineListenerSuccess(sortedIds))
        : dispatch(addNewTweetIdToTimeline(sortedIds[0]))
    }, (err) => dispatch(settingTimelineListenerError(err)))
  }
}

const initialState = {
  newTweetsAvailable: false,
  newTweetsToAdd: [],
  isFetching: false,
  error: '',
  tweetIds: []
}

export default function timeline (state = initialState, action) {
  switch (action.type) {
    case SETTING_TIMELINE_LISTENER :
      return {
        ...state,
        isFetching: true
      }
    case SETTING_TIMELINE_LISTENER_ERROR :
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    case SETTING_TIMELINE_LISTENER_SUCCESS :
      return {
        ...state,
        isFetching: false,
        error: '',
        tweetIds: action.tweetIds,
        newTweetsAvailable: false
      }
    case ADD_NEW_TWEET_ID_TO_TIMELINE :
      return {
        ...state,
        newTweetsToAdd: [action.tweetId, ...state.newTweetsToAdd],
        newTweetsAvailable: true
      }
    case RESET_NEW_TWEETS_AVAILABLE :
      return {
        ...state,
        tweetIds: [...state.newTweetsToAdd, ...state.tweetIds],
        newTweetsToAdd: [],
        newTweetsAvailable: false
      }
    default :
      return state
  }
}
