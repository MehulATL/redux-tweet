import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Timeline } from 'components'
import * as timelineActionCreators from 'redux/modules/timeline'

const TimelineContainer = React.createClass({
  propTypes: {
    tweetIds: PropTypes.array.isRequired,
    newTweetsAvailable: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    setAndHandleTimelineListener: PropTypes.func.isRequired,
    resetNewTweetsAvailable: PropTypes.func.isRequired
  },
  componentDidMount () {
    this.props.setAndHandleTimelineListener()
  },
  render () {
    return (
      <Timeline
        newTweetsAvailable={this.props.newTweetsAvailable}
        error={this.props.error}
        isFetching={this.props.isFetching}
        resetNewTweetsAvailable={this.props.resetNewTweetsAvailable}
        tweetIds={this.props.tweetIds} />
    )
  }
})

function mapStateToProps ({timeline}) {
  const { newTweetsAvailable, error, isFetching, tweetIds } = timeline
  return {
    newTweetsAvailable,
    error,
    isFetching,
    tweetIds
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(timelineActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TimelineContainer)
