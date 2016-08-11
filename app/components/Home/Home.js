import React, { PropTypes } from 'react'
import { container, title, slogan } from './styles.css'

const Home = (props) => {
  return (
    <div className={container}>
      <p className={title}>{'Redux-Tweet'}</p>
      <p className={slogan}>{'Real time, scalable, modular, cloud based Twitter clone built with React, Redux, Firebase, and Webpack'}</p>
    </div>
  )
}

export default Home
