import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar'
import { Input, Select, Option, Textarea } from '@material-tailwind/react'
import api from '../../api'

const CreateEvent = () => {
  const [image, setImage] = useState(null)
  const [minDateTime, setMinDateTime] = useState('')
  const [categories, setCategories] = useState([])

  useEffect(() => {
    getCurrentDateTime()
    getCategories()
  }, [])

  const getCategories = () => {
    api.get('event/get-categories/')
      .then(response => {
        setCategories(response.data)
        console.log(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    const currentDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
    setMinDateTime(currentDateTime);
  }

  return (
    <>
      <Navbar />

      <section className='px-5 md:px-20 py-10'>
        <h1 className='text-4xl font-bold'>Create Event</h1>

        <form className='mt-10 space-y-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Input label='Event Title' required />

            <Select label='Select Category' required>
              {
                categories.map(category => (
                  <Option key={ category.uuid } value={ category.uuid }>{ category.name }</Option>
                ))
              }
            </Select>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Textarea label='Event Description' required></Textarea>

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
                  onChange={e => setImage(e.target.files[0])} />
              </label>
            </div>
          </div>

          <Input type='text' label='Location' required />
          <Input type='datetime-local' label='Date and Time' min={minDateTime} required />

          <button type='submit' className='bg-blue text-white text-center w-full rounded-md py-2'>Submit</button>
        </form>
      </section>
    </>
  )
}

export default CreateEvent