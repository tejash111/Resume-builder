import React, { useContext, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import Modal from '../componets/Modal';
import Login from './Auth/Login';
import SignUp from './Auth/SignUp';
import { UserContext } from '../context/UserContext';
import ProfileInfoCard from '../componets/cards/profileInfoCard';


const LandingPage = () => {
  const {user}= useContext(UserContext)
  const navigate = useNavigate();

  const [openAuthModal,setOpenAuthModal]=useState(false);
  const [currentPage,setCurrentPage]=useState("login")

  const handleCTA = () => {
    if (!user) {
      setOpenAuthModal(true);
    }else{
      navigate("/dashboard")
    }
  };
  return (
    <div className='w-full min-h-full bg-white '>
      <div className='container mx-auto px-4 py-6   '>
      {/* header */}
      <header className='flex justify-between items-center mb-16'>
        <div className='text-xl font-bold'>Pitch-Perfect</div>
       {user ? <ProfileInfoCard/> : <button className='bg-purple-100 text-sm font-semibold text-black px-7 py-2.5 rounded-lg hover:bg-gray-800 hover:text-white transition-colors cursor-pointer' onClick={()=>setOpenAuthModal(true)}>
          Login / Sign Up 
        </button>
}
      </header>

      {/* hero content */}
      <div className='flex flex-col  items-center'>
         <div className='w-full pr-4 mb-8 md:mb-0  '>
          <h1 className='flex items-center justify-center text-5xl font-bold mb-6 leading-tight '
          >Get Hired or Get Fucked choise is yours
           
          </h1>
          <p className='text-lg text-gray-700 mb-8 flex items-center justify-center'>
            craft a standout resume in minutes with our smart and intiutive resume builder.
          </p>
          <div className='w-full pr-4 mb-8 md:mb-0 flex justify-center'>
  <button className='bg-black text-sm flex items-center justify-center font-semibold text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer' onClick={handleCTA}>
    Get Started
  </button>
</div>
         </div>
         

         {/* <section className='mt-5 '>
          <h2 className='text-2xl font-bold text-center mb-12'>Features that Make you shine</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition'>
              <h3 className='text-lg font-semibold mb-3'>
                Easy Editing
              </h3>
              <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, aperiam.</p>
            </div>
            <div className='bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition'>
              <h3 className='text-lg font-semibold mb-3'>
               Beautifull templates
              </h3>
              <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, aperiam.</p>
            </div>
            <div className='bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition'>
              <h3 className='text-lg font-semibold mb-3'>
                Lorem, ipsum.
              </h3>
              <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, aperiam.</p>
            </div>

          </div>
         </section> */}
      </div>
      </div>
      <Modal
      isOpen={openAuthModal}
      onClose={()=>{
        setOpenAuthModal(false);
        setCurrentPage("login")
      }}
      hideHeader
      >
        <div>
          {currentPage === "login" && <Login setCurrentPage={setCurrentPage}
          />}
          {currentPage=== "signup" && (
            <SignUp setCurrentPage={setCurrentPage}/> 
          )}
        </div>

      </Modal>

    </div>
  )
}

export default LandingPage