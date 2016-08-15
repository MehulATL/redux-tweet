import React, { PropTypes } from 'react'
import { TweetContainer } from 'containers'
import {
  mainContainer, container, content, repliesContainer,
  replyTextAreaContainer, replyTextArea } from './styles.css'
import { subHeader, darkBtn, errorMsg } from 'sharedStyles/styles.css'

const TweetDetails = ({tweetId, authedUser, isFetching, error}) => {
  return (
    <div className={mainContainer}>
      {isFetching === true
        ? <p className={subHeader}>{'Fetching'}</p>
        : <div className={container}>
            <div className={content}>
              <TweetContainer tweetId={tweetId} hideLikeCount={false} hideReplyBtn={true} />
              {'MAKE REPLY'}
            </div>
            <div className={repliesContainer}>
              {'REPLY SECTION'}
            </div>
          </div>}
      {error ? <p className={errorMsg}>{error}</p> : null}
    </div>
  )
}

TweetDetails.propTypes = {
  authedUser: PropTypes.object.isRequired,
  tweetId: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired
}

export default TweetDetails
