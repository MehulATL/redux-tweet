import React, { PropTypes } from 'react'
import { Map } from 'immutable'
import { formatTimestamp } from 'helpers/utils'
import Reply from 'react-icons/lib/fa/mail-reply'
import Star from 'react-icons/lib/fa/star'
import {
  tweetContainer, contentContainer, avatar, actionContainer,
  header, text, likeReplyContainer, icon, likedIcon, author
} from './styles.css'

const Tweet = (props) => {
  const starIcon = props.isLiked ? likedIcon : icon
  const starFn = props.isLiked ? props.handleDeleteLike : props.addAndHandleLike
  return (
    <div
      className={tweetContainer}
      style={{cursor: props.hideReplyBtn ? 'default' : 'pointer'}}
      onClick={props.onClick}>
      <img src={props.tweet.get('avatar')} className={avatar} />
      <div className={contentContainer}>
        <div className={header}>
          <div onClick={props.goToProfile} className={author}>{props.tweet.get('name')}</div>
          <div>{formatTimestamp(props.tweet.get('timestamp'))}</div>
        </div>
        <div className={text}>{props.tweet.get('text')}</div>
          <div className={likeReplyContainer}>
            {props.hideReplyBtn
              ? null
              : <Reply className={icon} />}
            <div className={actionContainer}>
              <Star className={starIcon} onClick={(e) => starFn(props.tweet.get('tweetId'), e)} />
              {props.hideLikeCount ? null : <div>{props.numberOfLikes}</div>}
            </div>
          </div>
      </div>
    </div>
  )
}

Tweet.propTypes = {
  tweet: PropTypes.instanceOf(Map),
  onClick: PropTypes.func,
  isLiked: PropTypes.bool.isRequired,
  addAndHandleLike: PropTypes.func.isRequired,
  handleDeleteLike: PropTypes.func.isRequired,
  numberOfLikes: PropTypes.number,
  hideReplyBtn: PropTypes.bool.isRequired,
  hideLikeCount: PropTypes.bool.isRequired,
  goToProfile: PropTypes.func.isRequired
}

export default Tweet
