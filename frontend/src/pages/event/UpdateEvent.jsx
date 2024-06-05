import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar'
import { Input, Select, Option, Textarea } from '@material-tailwind/react'
import api from '../../api'
import ProtectedRoute from '../../components/ProtectedRoute'
import { ThreeCircles } from 'react-loader-spinner'
import { useParams } from 'react-router-dom'

const UpdateEvent = () => {
  const { id } = useParams()

  const [categories, setCategories] = useState([])

  const [event, setEvent] = useState({})

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [image, setImage] = useState(null)
  const [categorySelected, setCategorySelected] = useState('')

  const [dateTime, setDateTime] = useState('')

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [loadingSubmit, setLoadingSubmit] = useState(false)
  const [loadingEventDetails, setLoadingEventDetails] = useState(true)

  useEffect(() => {
    getCategories()
    getEventDetails()
  }, [])

  const getCategories = () => {
    api.get('/event/get-categories/')
      .then(response => {
        setCategories(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const getEventDetails = () => {
    setLoadingEventDetails(true)
    api.get(`/event/get-event-details/${id}/`)
      .then(response => {
        setEvent(response.data)

        setTitle(response.data.title)
        setDescription(response.data.description)
        setLocation(response.data.location)
        setCategorySelected(response.data.category.name)
        setDateTime(response.data.date_and_time)

        setLoadingEventDetails(false)
      })
      .catch(error => {
        console.log(error)
        setLoadingEventDetails(false)
        setLoadingSubmit(false)
      })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoadingSubmit(true)
    setError('')
    setSuccess('')


    try {
      const res = await api.put(`/event/handle-event/${id}/`, { title, description, location, categorySelected, dateTime, image }, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      if (res.status === 200) {
        setSuccess('Event updated successfully')
        console.log(res.data)
        setLoadingSubmit(false)
      } else {
        setError('An error occurred')
        setLoadingSubmit(false)
      }
    } catch (error) {
      console.log(error)
      setError('An error occurred')
      setLoadingSubmit(false)
    }
  }



  return (
    <ProtectedRoute>
      <Navbar />

      <section className='px-5 md:px-20 py-10'>
        <h1 className='text-4xl font-bold'>Update Event</h1>



        {
          loadingEventDetails ? (
            <div className='m-5 md:mx-10 laptop:mx-20 flex justify-center'>
              <ThreeCircles
                color="green"
                height={50}
                width={50}
              />
            </div>
          ) : (
            <form onSubmit={handleSubmit} className='mt-10 space-y-4'>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <Input type='text'
                  label='Event Title'
                  value={ title }
                  onChange={ e => setTitle(e.target.value) }
                  required />

                <Select label='Select Category' value={categorySelected}>
                  {
                    categories.map(category => (
                      <Option key={ category.uuid } value={ category.uuid } onClick={ () => setCategorySelected(category.name) }>{ category.name }</Option>
                    ))
                  }
                </Select>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <Textarea label='Event Description'
                  value={ description }
                  onChange={ e => setDescription(e.target.value) }
                  required></Textarea>

                <div className='border border-gray-400 rounded-md'>
                  <div className='flex justify-center items-center h-72'>
                    {
                      image ? (
                        <img
                          src={URL.createObjectURL(image)}
                          alt="Image"
                          className='w-full h-full rounded-tl-md rounded-tr-md'
                        />
                      ) : (
                        <img
                          src={`${import.meta.env.VITE_API_URL}${event.image}`}
                          alt="Image"
                          className='w-full h-full rounded-tl-md rounded-tr-md'
                        />
                      )
                    }
                  </div>
                  <label htmlFor="image" className='text-center block bg-blue text-white py-2 rounded-b-md rounded-bl-md cursor-pointer'>
                    Upload Image
                    <input type="file"
                      id="image"
                      name="image"
                      className='hidden'
                      onChange={ e => setImage(e.target.files[0]) }
                    />
                  </label>
                </div>
              </div>

              <Input type='text'
                label='Location'
                value={ location }
                onChange={ e => setLocation(e.target.value) }
                required />

              <Input type='text'
                label='Date and Time (Local)'
                value={  dateTime  }
                onChange={  e => setDateTime(e.target.value)  }
                required
              />

              {
                error && (
                  <div className='text-center bg-red p-2 mt-5 text-white rounded-md'>
                    { error }
                  </div>
                )
              }

              {
                success && (
                  <div className='text-center bg-green p-2 mt-5 text-white rounded-md'>
                    { success }
                  </div>
                )
              }

              <button type='submit' className='bg-blue flex justify-center items-center text-white text-center w-full rounded-md py-2 h-10'>
                {
                  loadingSubmit ? (
                    <ThreeCircles
                      color='white'
                      width={20}
                      height={20}
                    />
                  ) : (
                    'Submit'
                  )
                }
              </button>
            </form>
          )
        }


      </section>
    </ProtectedRoute>
  )
}

export default UpdateEvent