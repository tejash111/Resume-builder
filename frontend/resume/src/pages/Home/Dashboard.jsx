import React, { useEffect, useState } from 'react'
import ProfileInfoCard from '../../componets/cards/profileInfoCard'
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/ApiPaths';


const Dashboard = () => {
  const [openCreateModal,setOpenCreateModal]= useState(false);
  const [allResumes,setAllResumes]=useState(null);

  const fetchAllResumes = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.RESUME.GET_ALL);
      setAllResumes(response.data);
    } catch (error) {
      console.error("error in fetching resumes",error);
      
    }
  }

  useEffect(()=>{
    fetchAllResumes();
  },[]);
  return (
    <div>
  
   khhb
    </div>
  )
}

export default Dashboard