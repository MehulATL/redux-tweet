import React, { PropTypes } from 'react'
import { User } from 'components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { staleTweets, staleUser } from 'helpers/utils'
import * as usersActionCreators from 'redux/modules/users'
import * as usersTweetActionCreators from 'redux/modules/usersTweets'

const UserContainer = React.createClass({
  propTypes: {
    name: PropTypes.string.isRequired,
    noUser: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    lastUpdated: PropTypes.number.isRequired,
    tweetIds: PropTypes.array.isRequired,
    routeParams: PropTypes.shape({uid: PropTypes.string.isRequired}),
    fetchAndHandleUserTweets: PropTypes.func.isRequired,
    fetchAndHandleUser: PropTypes.func.isRequired
  },
  componentDidMount () {
    const uid = this.props.routeParams.uid
    if (this.props.noUser === true || staleUser(this.props.lastUpdated)) {
      this.props.fetchAndHandleUser(uid)
    }

    if (this.props.noUser === true || staleTweets(this.props.lastUpdated)) {
      this.props.fetchAndHandleUserTweets(uid)
    }
  },
  render () {
    return (
      <User
        noUser={this.props.noUser}
        isFetching={this.props.isFetching}
        name={this.props.name}
        error={this.props.error}
        tweetIds={this.props.tweetIds} />
    )
  }
})

function mapStateToProps ({users, usersTweets}, props) {
  const selectedUsersTweet = usersTweets[props.routeParams.uid]
  const user = users[props.routeParams.uid]
  const noUser = typeof user === 'undefined'
  const name = noUser ? '' : user.info.name
  return {
    noUser,
    name,
    isFetching: users.isFetching || usersTweets.isFetching,
    error: users.error || usersTweets.error,
    lastUpdated: selectedUsersTweet ? selectedUsersTweet.lastUpdated : 0,
    tweetIds: selectedUsersTweet ? selectedUsersTweet.tweetIds : []
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    ...usersActionCreators,
    ...usersTweetActionCreators
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserContainer)
