import { postReply } from 'helpers/api'

const FETCHING_REPLIES = 'FETCHING_REPLIES'
const FETCHING_REPLIES_ERROR = 'FETCHING_REPLIES_ERROR'
const FETCHING_REPLIES_SUCCESS = 'FETCHING_REPLIES_SUCCESS'
const ADD_REPLY = 'ADD_REPLY'
const ADD_REPLY_ERROR = 'ADD_REPLY_ERROR'
const REMOVE_REPLY = 'REMOVE_REPLY'

function addReply (tweetId, reply) {
  return {
    type: ADD_REPLY,
    tweetId,
    reply
  }
}

function addReplyError (error) {
  console.warn(error)
  return {
    type: ADD_REPLY_ERROR,
    error: 'Error adding reply'
  }
}

function removeReply (tweetId, replyId) {
  return {
    type: REMOVE_REPLY,
    replyId
  }
}

function fetchingReplies () {
  return {
    type: FETCHING_REPLIES
  }
}

function fetchingRepliesError (error) {
  console.warn(error)
  return {
    type: FETCHING_REPLIES_ERROR,
    error: 'Error fetching replies'
  }
}

function fetchingRepliesSuccess (tweetId, replies) {
  return {
    type: FETCHING_REPLIES_SUCCESS,
    replies,
    tweetId,
    lastUpdated: Date.now()
  }
}

export function addAndHandleReply (tweetId, reply) {
  return function (dispatch, getState) {
    const { replyWithId, replyPromise } = postReply(tweetId, reply)

    dispatch(addReply(tweetId, replyWithId))
    replyPromise.catch((err) => {
      dispatch(removeReply(tweetId, replyWithId.replyId))
      dispatch(addReplyError(err))
    })
  }
}

const initialReply = {
  name: '',
  reply: '',
  uid: '',
  timestamp: 0,
  avatar: '',
  replyId: ''
}

function tweetReplies (state = initialReply, action) {
  switch (action.type) {
    case ADD_REPLY :
      return {
        ...state,
        [action.reply.replyId]: action.reply
      }
    case REMOVE_REPLY :
      return {
        ...state,
        [action.reply.replyId]: undefined
      }
    default :
      return state
  }
}

const initialTweetState = {
  lastUpdated: Date.now(),
  replies: {}
}

function repliesAndLastUpated (state = initialTweetState, action) {
  switch (action.type) {
    case FETCHING_REPLIES_SUCCESS :
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        replies: action.replies
      }
    case ADD_REPLY :
    case REMOVE_REPLY :
      return {
        ...state,
        replies: tweetReplies(state.replies, action)
      }
    default :
      return state
  }
}

const initialState = {
  isFetching: true,
  error: ''
}

export default function replies (state = initialState, action) {
  switch (action.type) {
    case FETCHING_REPLIES :
      return {
        ...state,
        isFetching: true
      }
    case FETCHING_REPLIES_ERROR :
    case ADD_REPLY_ERROR :
      return {
        ...state,
        isFetching: false,
        error: action.error
      }
    case ADD_REPLY :
    case FETCHING_REPLIES_SUCCESS :
    case REMOVE_REPLY :
      return {
        ...state,
        isFetching: false,
        error: '',
        [action.tweetId]: repliesAndLastUpated(state[action.tweetId], action)
      }
    default :
      return state
  }
}
