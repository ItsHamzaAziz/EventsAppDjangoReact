import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import hero_image from '../assets/hero.jpg'
import { Link } from 'react-router-dom'
import api from '../api'
import { ThreeDots } from 'react-loader-spinner'

const Home = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getEvents()
  }, [])

  const getEvents = () => {
    setLoading(true)
    api.get('/event/latest-events/')
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
    <>
      <Navbar />

      {/* Hero Section */}
      <section className='flex justify-center space-x-10 md:h-500 my-10 px-5 sm:px-20'>
        <div className='md:w-1/2 flex flex-col justify-center space-y-5'>
          <h3 className='text-3xl sm:text-5xl font-bold'>Unforgettable Moments,<br />Seamlessly Planned</h3>

          <img src={hero_image} alt="hero_image" className='block md:hidden w-full md:w-1/2 rounded-3xl h-full shadow-md shadow-gray-500' />

          <p className='text-lg'>Discover a world of extraordinary events with our all-in-one platform. Whether you're organizing a corporate gathering, a dream wedding, or an intimate celebration, we provide the tools and expertise to bring your vision to life.</p>

          <Link to={'/browse-events'}>
            <button className='rounded-full bg-purple-500 text-white py-3 px-6 w-full md:w-auto'>
              Browse Events Now
            </button>
          </Link>
        </div>

        <img src={hero_image} alt="hero_image" className='hidden md:block w-full md:w-1/2 rounded-3xl h-full shadow-md shadow-gray-500' />
      </section>


      {/* Upcoming Events */}
      <section className='my-10'>
        <h1 className='text-center text-3xl font-bold'>Newly Added Events</h1>

        <div className='my-5'>
          {
            loading ? (
              <div className='flex justify-center w-full mx-5 md:mx-20 mb-10'>
                <ThreeDots
                  color='blue'
                />
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
      </section>
    </>
  )
}

export default Home