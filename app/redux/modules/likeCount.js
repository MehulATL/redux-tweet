import { fetchLikeCount } from 'helpers/api'
import { ADD_LIKE, REMOVE_LIKE } from './usersLikes'
const FETCHING_COUNT = 'FETCHING_COUNT'
const FETCHING_COUNT_ERROR = 'FETCHING_COUNT_ERROR'
const FETCHING_COUNT_SUCCESS = 'FETCHING_COUNT_SUCCESS'

function fetchingCount () {
  return {
    type: FETCHING_COUNT
  }
}

function fetchingCountError (error) {
  console.warn(error)
  return {
    type: FETCHING_COUNT_ERROR,
    error: 'Error fetching tweet\'s like count'
  }
}

function fetchingCountSuccess (tweetId, count) {
  return {
    type: FETCHING_COUNT_SUCCESS,
    tweetId,
    count
  }
}

export function initLikeFetch (tweetId) {
  return function (dispatch) {
    dispatch(fetchingCount())
    fetchLikeCount(tweetId)
      .then(count => dispatch(fetchingCountSuccess(tweetId, count)))
      .catch(err => dispatch(fetchingCountError(err)))
  }
}

function count (state = 0, action) {
  switch (action.type) {
    case ADD_LIKE :
      return state + 1
    case REMOVE_LIKE :
      return state - 1
    default :
      return state
  }
}

const initialState = {
  isFetching: false,
  error: ''
}

export default function likeCount (state = initialState, action) {
  switch (action.type) {
    case FETCHING_COUNT :
      return {
        ...state,
        isFetching: true
      }
    case FETCHING_COUNT_ERROR :
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    case FETCHING_COUNT_SUCCESS :
      return {
        ...state,
        ...initialState,
        [action.tweetId]: action.count
      }
    case ADD_LIKE :
    case REMOVE_LIKE :
      return typeof state[action.tweetId] === 'undefined'
        ? state
        : {
          ...state,
          [action.tweetId]: count(state[action.tweetId], action)
        }
    default :
      return state
  }
}
