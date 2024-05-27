import React from 'react'
import Navbar from '../components/Navbar'
import hero_image from '../assets/hero.jpg'
import { Link } from 'react-router-dom'

const Home = () => {
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
          <h1 className='text-center text-3xl font-bold'>Upcomming Events</h1>
        </section>
    </>
  )
}

export default Home