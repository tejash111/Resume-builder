import React from 'react'
import ProfileInfoCard from '../cards/profileInfoCard'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <div className='h-16 bg-white   backdrop-blur-[2px] py-2.5 px-4 md:px-0 sticky top-0 z-30 '>
        <div className='mx-auto flex items-center justify-between gap-5 pr-5 '>
            <Link to ='/dashboard'>
            <div className='text-xl font-bold flex p-3'>
          <img src="logo.svg" alt="" className=' w-10 h-10 '/>
          Pitch-Perfect
        </div>
            </Link>

            <ProfileInfoCard/>
        </div>
    </div>
  )
}

export default Navbar