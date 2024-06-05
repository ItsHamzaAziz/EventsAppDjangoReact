import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ACCESS_TOKEN } from '../constants'

const NavList = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null)

  useEffect(() => {
    try {
      const accessToken = localStorage.getItem(ACCESS_TOKEN)

      setIsAuthenticated(!!accessToken)
    } catch (error) {
      console.error(error)
    }
  }, [])

  return (
    <ul className='flex flex-col md:flex-row list-none space-y-3 md:space-x-5 md:space-y-0'>
      <li>
        <Link to={'/'}>Home</Link>
      </li>
      <li>
        <Link to={'/browse-events'}>Browse Events</Link>
      </li>
      {
        isAuthenticated && (
          <>
            <li>
              <Link to={'/create-event'}>Create Event</Link>
            </li>
            <li>
              <Link to={'/my-events'}>My Events</Link>
            </li>
          </>
        )
      }

    </ul>
  )
}

export default NavList