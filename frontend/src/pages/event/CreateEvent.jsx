import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar'
import { Input, Select, Option, Textarea } from '@material-tailwind/react'
import api from '../../api'
import ProtectedRoute from '../../components/ProtectedRoute'
import { ThreeCircles } from 'react-loader-spinner'

const CreateEvent = () => {
  const [categories, setCategories] = useState([])

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [image, setImage] = useState(null)
  const [dateTime, setDateTime] = useState('')
  const [category, setCategory] = useState('')

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getCategories()
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


  const handleSubmit = async (e) => {
    setLoading(true)
    setError('')
    setSuccess('')

    e.preventDefault()

    if (!category) {
      setError('Select a Category')
      setLoading(false)
      return
    }

    if (!image) {
      setError('Upload an Image')
      setLoading(false)
      return
    }

    try {
      const res = await api.post('/event/create-event/', { title, description, location, category, dateTime, image }, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      if (res.status === 200) {
        setSuccess('Event created successfully')
        console.log(res.data)
        setLoading(false)
      } else {
        setError('An error occurred')
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
      setError('An error occurred')
      setLoading(false)
    }
  }

  return (
    <ProtectedRoute>
      <Navbar />

      <section className='px-5 md:px-20 py-10'>
        <h1 className='text-4xl font-bold'>Create Event</h1>

        <form onSubmit={ handleSubmit } className='mt-10 space-y-4'>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Input type='text'
              label='Event Title'
              value={ title }
              onChange={ e => setTitle(e.target.value) }
              required />

            <Select label='Select Category'>
              {
                categories.map(category => (
                  <Option key={ category.uuid } value={ category.uuid } onClick={ () => setCategory(category.uuid) }>{ category.name }</Option>
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
                    <span className='p-5 text-center'>
                      Image Preview Will Display Here
                    </span>
                  )
                }
              </div>
              <label htmlFor="image" className='text-center block bg-blue text-white py-2 rounded-b-md rounded-bl-md cursor-pointer'>
                Upload Image
                <input type="file"
                  name="image"
                  id="image"
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
            required
          />

          <Input type='text'
            label='Date and Time (Local)'
            value={ dateTime }
            onChange={ e => setDateTime(e.target.value) }
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
              loading ? (
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
      </section>
    </ProtectedRoute>
  )
}

export default CreateEvent