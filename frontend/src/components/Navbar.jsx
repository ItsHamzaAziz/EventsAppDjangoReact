import React, { useState, Fragment } from 'react'
import logo from '../assets/logo.jpg'
import NavList from './NavList'
import {
  Drawer,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import NavButtons from './NavButtons';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [openRight, setOpenRight] = useState(false);

  const openDrawerRight = () => setOpenRight(true);
  const closeDrawerRight = () => setOpenRight(false)

  return (
    <nav className='flex justify-evenly items-center py-2 pt-3 mb-4'>
      <Link to={'/'}>
        <div className='flex items-center space-x-2'>
          <img src={logo} alt="logo" width={50} height={50} className='rounded-full' />
          <span className='text-xl font-serif'>Eventy</span>
        </div>
      </Link>

      <div className='hidden md:block'>
        <NavList />
      </div>

      <div className='block md:hidden'>
        <Fragment>
          <Button onClick={openDrawerRight} className='bg-transparent shadow-none'>
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h14" />
            </svg>
          </Button>
          <Drawer
            placement="right"
            open={openRight}
            onClose={closeDrawerRight}
            className="p-4"
          >
            <div className="mb-6 flex items-center justify-between">
              <Typography variant="h5" color="blue-gray">
                Eventy
              </Typography>
              <IconButton
                variant="text"
                color="blue-gray"
                onClick={closeDrawerRight}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </IconButton>
            </div>
            <div>
              <NavList />
              <NavButtons />
            </div>
          </Drawer>
        </Fragment>
      </div>

      <div className='hidden md:block'>
        <NavButtons />
      </div>
    </nav>
  )
}

export default Navbar


