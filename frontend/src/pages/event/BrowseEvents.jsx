import React from 'react'
import Navbar from '../../components/Navbar'
import { Input, Select, Option } from '@material-tailwind/react'

const BrowseEvents = () => {
  return (
    <>
      <Navbar />
      <section className='px-10 md:px-20 py-10'>
        <h2 className='text-3xl font-bold'>Trusted by<br />Thousands of Events</h2>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 py-10'>
          <Input className='text-black' label='Search Event' />
          <Select label='Filter by Categories'>
            <Option value='1'>General</Option>
            <Option value='2'>IT & Tech</Option>
            <Option value='3'>Art & Culture</Option>
            <Option value='4'>Education</Option>
          </Select>
        </div>
      </section>
    </>
  )
}

export default BrowseEvents