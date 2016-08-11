const OPEN_MODAL = 'OPEN_MODAL'
const CLOSE_MODAL = 'CLOSE_MODAL'
const UPDATE_TWEET_TEXT = 'UPDATE_TWEET_TEXT'

export function openModal () {
  return {
    type: OPEN_MODAL
  }
}

export function closeModal () {
  return {
    type: CLOSE_MODAL
  }
}

export function updateTweetText (newTweetText) {
  return {
    type: UPDATE_TWEET_TEXT,
    newTweetText
  }
}

const initialState = {
  tweetText: '',
  isOpen: false
}

export default function modal (state = initialState, action) {
  switch (action.type) {
    case OPEN_MODAL :
      return {
        ...state,
        isOpen: true
      }
    case CLOSE_MODAL :
      return {
        tweetText: '',
        isOpen: false
      }
    case UPDATE_TWEET_TEXT :
      return {
        ...state,
        tweetText: action.newTweetText
      }
    default :
      return state
  }
}
