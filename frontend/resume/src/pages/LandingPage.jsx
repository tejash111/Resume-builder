import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from '../componets/Modal';
import Login from './Auth/Login';
import SignUp from './Auth/SignUp';
import { UserContext } from '../context/UserContext';
import ProfileInfoCard from '../componets/cards/profileInfoCard';
import resumeLogo from '../assets/resumelogo.webp';
import resumeLogo2 from '../assets/resumelogo2.png';
import { motion } from 'framer-motion';

const LandingPage = () => {
  const { user } = useContext(UserContext)
  const navigate = useNavigate();

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login")
  const [flipped, setFlipped] = useState(false);

  // Auto-flip every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setFlipped(f => !f);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleCTA = () => {
    if (!user) {
      setOpenAuthModal(true);
    } else {
      navigate("/dashboard")
    }
  };

  return (
    <div className='w-full min-h-screen bg-[url("/bg.jpg")] bg-cover bg-center")'>
      
      {/* Navbar/Header at the top */}
      <header className='w-full flex items-center justify-between  md:px-10 bg-transparent  rounded-full  ml-2 h-13'>
        <div className='text-xl font-bold flex items-center gap-2 '>
          <img src="src/assets/logo.svg" alt="" className='w-10 h-10' />
          Pitch-Perfect
        </div>
        <div>
          {user ? <ProfileInfoCard /> : <button className='bg-black text-sm font-semibold text-white px-7 py-2.5 rounded-lg hover:bg-gray-800 hover:text-white transition-colors cursor-pointer' onClick={() => setOpenAuthModal(true)}>
            Login / Sign Up
          </button>}
        </div>
      </header>
      {/* Main Content: Two-column hero section */}
      <div className='w-full flex items-center justify-center min-h-[80vh]'>
        <div className='container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between'>
          {/* Left Side: Title, Para, Button */}
          <div className='flex-1 flex flex-col items-start justify-center gap-8 max-w-xl ml-10'>
            <h1 className='text-5xl font-bold mb-4 text-black'>Get Hired or Get Fuck*d, choice is yours!!</h1>
            <p className='text-lg text-black mb-6'>Craft a standout resume in minutes with our smart and intuitive resume builder.</p>
            <button className='bg-black text-sm flex items-center justify-center font-semibold text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer' onClick={handleCTA}>
              Get Started
            </button>
          </div>
          {/* Right Side: Logo Image with Flip Animation */}
          <div className='flex-1 flex items-center justify-center mt-10 md:mt-0'>
            <motion.div
              className="relative w-[220px] h-[320px] cursor-pointer"
              style={{ perspective: 1200 }}
              onClick={() => setFlipped(f => !f)}
              onMouseEnter={() => setFlipped(true)}
              onMouseLeave={() => setFlipped(false)}
            >
              <motion.img
                src={resumeLogo}
                alt="Resume Logo Front"
                className="absolute w-full h-full object-contain rounded-xl shadow-lg scale-120 "
                style={{ backfaceVisibility: 'hidden' }}
                animate={{ rotateY: flipped ? 180 : 0 }}
                transition={{ duration: 0.7, ease: 'easeInOut' }}
              />
              <motion.img
                src={resumeLogo2}
                alt="Resume Logo Back"
                className="absolute w-full h-full object-contain rounded-xl shadow-lg scale-120"
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                animate={{ rotateY: flipped ? 0 : -180 }}
                transition={{ duration: 0.7, ease: 'easeInOut' }}
              />
            </motion.div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("login")
        }}
        hideHeader
      >
        <div>
          {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
          {currentPage === "signup" && (<SignUp setCurrentPage={setCurrentPage} />)}
        </div>
      </Modal>
     
    </div>
  )
}

export default LandingPage