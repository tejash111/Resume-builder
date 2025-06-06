import React, { useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import DashboardLayout from '../../componets/layouts/DashboardLayout';

const EditResume = () => {
  const {resumeId}=useParams()
  const navigate=useNavigate();

  const resumeRef = useRef(null)
  const resumeDownloadRef = useRef(null);

  const [basewidth,setBaseWidth]=useState(800);

  const [openThemeSelector,setOpenThemeSelector]=useState(false)
  const [openPreviewModal,setOpenPreviewModal]=useState(false)

  const [currentPage,setCurrentPage]=useState('profile-info')
  const [progress,setProgress]=useState(0)
  const [resumeData,setResumeData]=useState({
    title : "",
    thumbnailLink : "",
    profileInfo : {
      profileImg: null,
      profilePreviewUrl: '',
      fullName : "",
      designation : "",
      summary : "",
    },
    template : {
      theme : "",
      colorPalette: "",
    },
    contactInfo: {
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      github: "",
      website: "",
    },
    workExperience: [
      {company:"",
        role : "",
        startDate: "",
        endDate : "",
        description : "",
      },
    ],
    education : [
      {
        degree: "",
        institution:"",
        startDate: "",
        endDate: ""
      },
    ],
    skills : [
      {
        name : "",
        progress:0,
      },
    ],
    projects: [
      {
        title:"",
        description:"",
        github: "",
        liveDemo: "",
      },
    ],
    certifications: [
      {
      title:"",
      issuer: "",
      year: "",
      }
    ],
    languages: [
      {
        name : "",
        progress: 0
      },
    ],
    interests: [""],
  });

  const [errorMsg,setErrorMsg]=useState("");
  const [isLoading,setIsLoading]=useState(false)

  //validate inputs
  const validateAndNext = (e) => {};

  //function to navigate to the next page
  const goToNextStep = () => {};

  //function to navigate to the previous page
  const goBack = ()  => {};
  
  const renderForm = () => {};

  //update simple nested object (like profileinfo , contact info etc.)
  const updateSection = (section,key,value)=> {};

  //update array item like workexp[0] , sills , etc
  const updateArrayItems = (section,index,key,value)=> {};

  //add items to array 
    
  return (
    <DashboardLayout>
      <div>
        <div>
          <TitleInput
          title={resumeData.title}
          setTitle={(value)=>
            setResumeData((prevState)=>({
              ...prevState,
              title:value,
            }))
          }
          />
        </div>
      </div>
    </DashboardLayout>
  )
}

export default EditResume