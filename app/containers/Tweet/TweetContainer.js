import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Tweet } from 'components'
const { func, object, bool, number } = PropTypes

const TweetContainer = React.createClass({
  propTypes: {
    numberOfLikes: number,
    isLiked: bool.isRequired,
    handleDeleteLike: func.isRequired,
    addAndHandleLike: func.isRequired,
    hideLikeCount: bool.isRequired,
    tweet: object.isRequired,
    hideReplyBtn: bool.isRequired
  },
  contextTypes: {
    router: PropTypes.object.isRequired
  },
  getDefaultProps: function () {
    return {
      hideLikeCount: false,
      hideReplyBtn: false
    }
  },
  goToProfile (e) {
    e.stopPropagation()
    this.context.router.push('/' + this.props.tweet.uid)
  },
  handleClick (e) {
    e.stopPropagation()
    this.context.router.push('/tweetDetail/' + this.props.tweet.tweetId)
  },
  render () {
    return (
      <Tweet
        goToProfile={this.goToProfile}
        onClick={this.props.hideReplyBtn === true ? null : this.handleClick}
        tweet={this.props.tweet}
        {...this.props} />
    )
  }
})

function mapStateToProps ({tweets, likeCount, usersLikes}, props) {
  return {
    tweet: tweets[props.tweetId],
    hideLikeCount: props.hideLikeCount,
    hideReplyBtn: props.hideReplyBtn,
    isLiked: usersLikes[props.tweetId] === true,
    numberOfLikes: likeCount[props.tweetId]
  }
}

export default connect(mapStateToProps)(TweetContainer)
