import React, { useState, useEffect } from 'react'
import ProtectedRoute from '../../components/ProtectedRoute'
import Navbar from '../../components/Navbar'
import api from '../../api'
import { ThreeDots } from 'react-loader-spinner'
import { Link } from 'react-router-dom'

const MyEvents = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getEvents()
  }, [])

  const getEvents = () => {
    setLoading(true)
    api.get('/event/get-my-events/')
      .then(response => {
        setEvents(response.data)
        setLoading(false)
      })
      .catch(error => {
        console.log(error)
        setLoading(false)
      })
  }


  return (
    <ProtectedRoute>
      <Navbar />
      <div className='mt-5'>
        {
          loading ? (
            <div className='flex justify-center w-full mx-5 md:mx-20 mb-10'>
              <ThreeDots
                color='blue'
              />
            </div>
          ) : (
            <div>
              <h1 className='text-center text-3xl font-bold mb-5'>My Events</h1>

              {
                events.length === 0 ? (
                  <div className='text-center text-xl px-2'>
                    <p>You have no events</p>
                    <p><Link to={'/create-event'} className='underline'>Click Here</Link> to create an event</p>
                  </div>
                ) : (
                  <div className='grid grid-cols-1 md:grid-cols-2 laptop:grid-cols-3 gap-4 mx-5 md:mx-20 mb-10'>
                    {
                      events.map(event => (
                        <Link key={ event.uuid } to={`/event/${event.uuid}`}>
                          <div className='rounded-lg h-full border border-gray-300 shadow-md p-5 flex flex-col justify-between space-y-2'>
                            <div className='space-y-3'>
                              <img
                                src={`${import.meta.env.VITE_API_URL}${event.image}`}
                                alt="Event Image"
                                className='w-full h-56 rounded-lg'
                              />
                              <h1 className='text-2xl font-bold'>{ event.title }</h1>
                              <div>
                                <p>{ event.location }</p>
                                <p>{ event.date_time }</p>
                              </div>
                            </div>
    
                            <p>Category: { event.category.name }</p>
                          </div>
                        </Link>
                      ))
                    }
                  </div>
                )
              }
            </div>
          )
        }
      </div>
    </ProtectedRoute>
  )
}

export default MyEvents