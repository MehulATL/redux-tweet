import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { ModalContainer } from 'containers'
import { container, navContainer, link } from './styles.css'

const NavLinks = ({isAuthed}) => {
  return isAuthed
    ? <ul>
        <li><Link className={link} to='/'>{'Home'}</Link></li>
      </ul>
    : null
}

const ActionLinks = ({isAuthed}) => {
  return isAuthed
    ? <ul>
        <li><ModalContainer /></li>
        <li><Link className={link} to='/logout'>{'Logout'}</Link></li>
      </ul>
    : <ul>
        <li><Link className={link} to='/'>{'Home'}</Link></li>
        <li><Link className={link} to='/auth'>{'Authenticate'}</Link></li>
      </ul>
}

const Navigation = ({isAuthed}) => {
  return (
    <div className={container}>
      <nav className={navContainer}>
        <NavLinks isAuthed={isAuthed} />
        <ActionLinks isAuthed={isAuthed}/>
      </nav>
    </div>
  )
}

Navigation.propTypes = NavLinks.propTypes = ActionLinks.propTypes = {
  isAuthed: PropTypes.bool.isRequired
}

export default Navigation
