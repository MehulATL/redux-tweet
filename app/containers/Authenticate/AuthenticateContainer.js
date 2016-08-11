import React, { PropTypes } from 'react'
import { Authenticate } from 'components'
import auth from 'helpers/auth'

const AuthenticateContainer = React.createClass({
  handleAuth () {
    auth().then(user => console.log('auth user', user ))
  },
  render () {
    return (
      <Authenticate
        isFetching={false}
        error=''
        onAuth={this.handleAuth}/>
    )
  }
})

export default AuthenticateContainer
