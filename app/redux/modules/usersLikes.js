import {
  fetchUsersLikes, saveToUsersLikes, deleteFromUsersLikes,
  incrementLikeCount, decrementLikeCount
} from 'helpers/api'

export const ADD_LIKE = 'ADD_LIKE'
export const REMOVE_LIKE = 'REMOVE_LIKE'
const FETCHING_LIKES = 'FETCHING_LIKES'
const FETCHING_LIKES_ERROR = 'FETCHING_LIKES_ERROR'
const FETCHING_LIKES_SUCCESS = 'FETCHING_LIKES_SUCCESS'

function addLike (tweetId) {
  return {
    type: ADD_LIKE,
    tweetId
  }
}

function removeLike (tweetId) {
  return {
    type: REMOVE_LIKE,
    tweetId
  }
}

function fetchingLikes () {
  return {
    type: FETCHING_LIKES
  }
}

function fetchLikesError (error) {
  console.warn(error)
  return {
    type: FETCHING_LIKES_ERROR,
    error: 'Error fetching likes'
  }
}

function fetchingLikesSuccess (likes) {
  return {
    type: FETCHING_LIKES_SUCCESS,
    likes
  }
}

export function addAndHandleLike (tweetId, e) {
  e.stopPropagation()
  return function (dispatch, getState) {
    dispatch(addLike(tweetId))

    const uid = getState().users.authedId
    Promise.all([
      saveToUsersLikes(uid, tweetId),
      incrementLikeCount(tweetId)
    ]).catch((err) => {
      console.warn(err)
      dispatch(removeLike(tweetId))
    })
  }
}

export function handleDeleteLike (tweetId, e) {
  e.stopPropagation()
  return function (dispatch, getState) {
    dispatch(removeLike(tweetId))

    const uid = getState().users.authedId
    Promise.all([
      deleteFromUsersLikes(uid, tweetId),
      decrementLikeCount(tweetId)
    ])
      .catch((error) => {
        console.warn(error)
        dispatch(addLike(tweetId))
      })
  }
}

export function setUsersLikes () {
  return function (dispatch, getState) {
    const uid = getState().users.authedId
    dispatch(fetchingLikes())
    fetchUsersLikes(uid)
      .then((likes) => dispatch(fetchingLikesSuccess(likes)))
      .catch((err) => dispatch(fetchLikesError(err)))
  }
}

const initialState = {
  isFetching: false,
  error: ''
}

export default function usersLikes (state = initialState, action) {
  const type = action.type
  switch (type) {
    case FETCHING_LIKES :
      return {
        ...state,
        isFetching: true
      }
    case FETCHING_LIKES_ERROR :
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    case FETCHING_LIKES_SUCCESS :
      return {
        ...state,
        ...action.likes,
        isFetching: false,
        error: ''
      }
    case ADD_LIKE :
      return {
        ...state,
        [action.tweetId]: true
      }
    case REMOVE_LIKE :
      return Object.keys(state)
        .filter((tweetId) => action.tweetId !== tweetId)
        .reduce((prev, current) => {
          prev[current] = state[current]
          return prev
        }, {})
    default :
      return state
  }
}
