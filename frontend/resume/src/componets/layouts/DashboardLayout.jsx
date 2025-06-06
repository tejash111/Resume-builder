import React, { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import Navbar from './Navbar';

const DashboardLayout = ({activeMenue,children}) => {
    const {user} = useContext(UserContext);
  return (
    <div>
        <Navbar activeMenue={activeMenue} />
        {user && <div className='  p-4'>
           {children}
            </div>}
    </div>
  )
}

export default DashboardLayout