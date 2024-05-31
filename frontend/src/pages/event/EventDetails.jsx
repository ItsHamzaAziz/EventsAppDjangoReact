import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../api'
import Navbar from '../../components/Navbar'
import { ThreeCircles } from 'react-loader-spinner'

const EventDetails = () => {
  const { id } = useParams()

  const [event, setEvent] = useState({})

  const [username, setUsername] = useState('')
  const [category, setCategory] = useState('')

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    api.get(`event/event-details/${id}/`)
      .then(response => {
        setEvent(response.data)
        setUsername(response.data.user.username)
        setCategory(response.data.category.name)
        setLoading(false)
      })
      .catch(error => {
        console.log(error)
        setLoading(false)
      })
  }, [])


  return (
    <>
      <Navbar />
      {
        loading ? (
          <div className='m-5 md:mx-10 laptop:mx-20 flex justify-center'>
            <ThreeCircles
              color="green"
              height={50}
              width={50}
            />
          </div>
        ) : (
          <div className='m-5 md:mx-10 laptop:mx-20 grid grid-cols-1 md:grid-cols-2 gap-5'>
            <img src={`${import.meta.env.VITE_API_URL}${event.image}`}
              alt="Event Image"
              className='h-72 sm:h-[500px] w-full rounded-2xl'
            />

            <div className='py-5 space-y-5'>
              <div className='text-center md:text-left'>
                <h1 className='font-bold text-3xl'>{event.title}</h1>
                <p>Event by {username}</p>
              </div>

              <div>
                <p><span className='font-bold'>Location:</span> {event.location}</p>
                <p><span className='font-bold'>At:</span> {event.date_time}</p>
              </div>

              <p><span className='font-bold'>Category:</span> {category}</p>

              <p>{event.description}</p>
            </div>
          </div>
        )
      }
    </>
  )
}

export default EventDetails