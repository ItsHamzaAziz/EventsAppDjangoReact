import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar'
import { Input, Select, Option } from '@material-tailwind/react'
import api from '../../api'
import { ThreeDots } from 'react-loader-spinner'

const BrowseEvents = () => {
  const [categories, setCategories] = useState([])
  const [events, setEvents] = useState([])

  const [category, setCategory] = useState('')

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCategories()
    getEvents()
  }, [])

  const getCategories = () => {
    api.get('event/get-categories/')
      .then(response => {
        setCategories(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const getEvents = () => {
    setLoading(true)
    api.get('event/get-events/')
     .then(response => {
        setEvents(response.data)
        console.log(response.data)
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
      <section className='mx-5 md:mx-20 mt-10'>
        <h2 className='text-3xl font-bold'>Trusted by<br />Thousands of Events</h2>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 py-10'>
          <Input className='text-black' label='Search Event' />
          <Select label='Filter by Categories'>
            {
              categories.map(category => (
                <Option key={ category.uuid } value={ category.uuid } onClick={ () => setCategory(category.uuid) }>{ category.name }</Option>
              ))
            }
          </Select>
        </div>
      </section>

      <section>
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
                  <div key={ event.uuid } className='rounded-lg border border-gray-300 shadow-md p-5 flex flex-col justify-between space-y-2'>
                    <div className='space-y-3'>
                      <img 
                        src={`${import.meta.env.VITE_API_URL}${ event.image }`} 
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
                ))
              }
            </div>
          )
        }

        
      </section>
    </>
  )
}

export default BrowseEvents