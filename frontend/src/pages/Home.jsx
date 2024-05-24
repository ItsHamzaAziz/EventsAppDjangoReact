import React from 'react'
import Navbar from '../components/Navbar'
import hero_image from '../assets/hero.jpg'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
        <Navbar />

        {/* Hero Section */}
        <section className='flex mx-auto justify-center space-x-10 md:h-500 my-16 px-20'>
          <div className='md:w-1/2 flex flex-col justify-center space-y-4'>
            <h3 className='text-5xl font-bold'>Unforgettable Moments,<br />Seamlessly Planned</h3>

            <p className='text-lg'>Discover a world of extraordinary events with our all-in-one platform. Whether you're organizing a corporate gathering, a dream wedding, or an intimate celebration, we provide the tools and expertise to bring your vision to life.</p>

            <Link to={'/browse-events'}>
              <button className='rounded-full bg-purple-500 text-white py-3 px-6 w-full md:w-auto'>
                Browse Events Now
              </button>
            </Link>
          </div>

          <div className='hidden md:block w-1/2'>
            <img src={hero_image} alt="hero_image" className='w-full rounded-2xl h-full' />
          </div>
        </section>


        {/* Upcoming Events */}
        <section>
          <h1 className='text-center text-3xl font-bold'>Upcomming Events</h1>
        </section>
    </>
  )
}

export default Home