import React, { PropTypes } from 'react'
import { Authenticate } from 'components'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as userActionCreators from 'redux/modules/users'
import auth from 'helpers/auth'

const AuthenticateContainer = React.createClass({
  propTypes: {
    error: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    authUser: PropTypes.func.isRequired,
    fetchingUser: PropTypes.func.isRequired,
    fetchingUserSuccess: PropTypes.func.isRequired,
    fetchingUserFailure: PropTypes.func.isRequired
  },
  handleAuth () {
    this.props.fetchingUser()
    auth().then(user => {
      this.props.fetchingUserSuccess(user.uid, user, Date.now())
      this.props.authUser(user.uid)
    })
    .catch(err => this.props.fetchingUserFailure(err))
  },
  render () {
    return (
      <Authenticate
        isFetching={this.props.isFetching}
        error={this.props.error}
        onAuth={this.handleAuth}/>
    )
  }
})

function mapStateToProps (state) {
  console.log('STATE', state);
  return {
    isFetching: state.isFetching,
    error: state.error
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(userActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticateContainer)
