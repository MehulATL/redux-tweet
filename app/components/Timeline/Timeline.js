import React, { PropTypes } from 'react'
import { newTweetContainer, header } from './styles.css'
import { TweetContainer } from 'containers'
import { errorMsg } from 'sharedStyles/styles.css'

NewTweetsAvailable.propTypes = {
  handleClick: PropTypes.func.isRequired
}

function NewTweetsAvailable ({handleClick}) {
  return (
    <div className={newTweetContainer} onClick={handleClick}>
      {'New Tweets Available'}
    </div>
  )
}

Timeline.propTypes = {
  tweetIds: PropTypes.array.isRequired,
  error: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  newTweetsAvailable: PropTypes.bool.isRequired,
  resetNewTweetsAvailable: PropTypes.func.isRequired
}

export default function Timeline (props) {
  return props.isFetching
    ? <h1 className={header}>{'Fetching'}</h1>
    : <div>
        {props.newTweetsAvailable ? <NewTweetsAvailable handleClick={props.resetNewTweetsAvailable} /> : null}
        {props.tweetIds.length === 0
            ? <p className={header}>{'This is unfortunate.'} <br /> {'It appears there are no tweets yet 😞'}</p>
            : null}
        {props.tweetIds.map((id) => (
          <TweetContainer tweetId={id} key={id} />
        ))}
        {props.error ? <p className={errorMsg}>{props.error}</p> : null}
      </div>
}
