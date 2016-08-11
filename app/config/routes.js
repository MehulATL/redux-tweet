import React from 'react'
import { Router, hashHistory, IndexRoute, Route } from 'react-router'
import {
  MainContainer,
  HomeContainer,
  AuthenticateContainer,
  TimelineContainer,
  LogoutContainer
} from 'containers'

export default function getRoutes (checkAuth) {
  return (
    <Router history={hashHistory}>
      <Router path='/' component={MainContainer}>
        <Route path='auth' component={AuthenticateContainer} onEnter={checkAuth} />
        <Route path='timeline' component={TimelineContainer} onEnter={checkAuth} />
        <Route path='logout' component={LogoutContainer} />
        <IndexRoute component={HomeContainer} onEnter={checkAuth} />
      </Router>
    </Router>
  )
}
