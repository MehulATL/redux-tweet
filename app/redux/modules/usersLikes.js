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
