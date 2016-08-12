import React, { PropTypes } from 'react'

const Tweet = (props) => {
  console.log(props)
  return (
    <div>
      {props.tweet.name} – {props.tweet.text}
    </div>
  )
}

export default Tweet
