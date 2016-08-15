import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { TweetDetails } from 'components'
import * as tweetActionCreators from 'redux/modules/tweets'
import * as likeCountActionCreators from 'redux/modules/likeCount'
import * as repliesActionCreators from 'redux/modules/replies'

const TweetDetailsContainer = React.createClass({
  propTypes: {
    authedUser: PropTypes.object.isRequired,
    tweetId: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    tweetAlreadyFetched: PropTypes.bool.isRequired,
    stopFetching: PropTypes.func.isRequired,
    fetchAndHandleTweet: PropTypes.func.isRequired,
    initLikeFetch: PropTypes.func.isRequired,
    addAndHandleReply: PropTypes.func.isRequired
  },
  componentDidMount: function () {
    this.props.initLikeFetch(this.props.tweetId)
    if (!this.props.tweetAlreadyFetched) {
      this.props.fetchAndHandleTweet(this.props.tweetId)
    } else {
      this.props.stopFetching()
    }
  },
  render () {
    return (
      <TweetDetails
        addAndHandleReply={this.props.addAndHandleReply}
        authedUser={this.props.authedUser}
        tweetId={this.props.tweetId}
        isFetching={this.props.isFetching}
        error={this.props.error} />
    )
  }
})

function mapStateToProps ({tweets, likeCount, users}, props) {
  return {
    isFetching: tweets.isFetching || likeCount.isFetching,
    error: tweets.error,
    authedUser: users[users.authedId].info,
    tweetId: props.routeParams.tweetId,
    tweetAlreadyFetched: !!tweets[props.routeParams.tweetId]
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    ...tweetActionCreators,
    ...likeCountActionCreators,
    ...repliesActionCreators
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TweetDetailsContainer)
