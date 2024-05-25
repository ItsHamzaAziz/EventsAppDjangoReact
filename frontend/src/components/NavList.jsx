import React from 'react'
import { Link } from 'react-router-dom'

const NavList = () => {
  return (
    <ul className='flex flex-col md:flex-row list-none space-y-3 md:space-x-5 md:space-y-0'>
        <li>
          <Link to={'/'}>Home</Link>
        </li>
        <li>
          <Link to={'/browse-events'}>Browse Events</Link>
        </li>
        <li>
          <Link to={'/create-event'}>Create Event</Link>
        </li>
        <li>
          <Link to={'/profile'}>Profile</Link>
        </li>
    </ul>
  )
}

export default NavList