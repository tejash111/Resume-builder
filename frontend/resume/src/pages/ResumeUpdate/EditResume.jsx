import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import DashboardLayout from '../../componets/layouts/DashboardLayout';
import {useReactToPrint} from 'react-to-print'
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/ApiPaths';
import TitleInput from '../../componets/inputs/TitleInput';
import { LuArrowLeft, LuCircleAlert, LuDownload, LuPalette, LuSave, LuTrash } from 'react-icons/lu';
import StepProgress from '../../componets/StepProgress';
import ProfileInfoForm from './Forms/ProfileInfoForm';

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
  
  const renderForm = () => {
    switch (currentPage){
      case  "profile-info":
        return (
        <ProfileInfoForm
        profileData = {resumeData?.profileInfo}
        updateSection = {(key,value) => {
          updateSection('profileInfo',key,value);
        }}
        onNext={validateAndNext}
        />
      )
      default :
    return null;
    };
  };

  //update simple nested object (like profileinfo , contact info etc.)
  const updateSection = (section,key,value)=> {};

  //update array item like workexp[0] , sills , etc
  const updateArrayItems = (section,index,key,value)=> {};

  //add items to array 
    const addArrayItem = (section,newItem)=> {}

  //remove items from array
  const removeArrayItem = (section,index)=> {}

  //fetch resume info by id
  const fetchResumeInfoById = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.RESUME.GET_BY_ID(resumeId)
      );

      if (response.data && response.data.profileInfo){
        const resumeInfo = response.data;

        setResumeData((prevState)=> ({
          ...prevState,
          title: resumeInfo?.title || 'untitled',
          template : resumeInfo?.template || prevState?.template,
          profileInfo: resumeInfo?.profileInfo || prevState?.profileInfo,
          contactInfo:resumeInfo?.contactInfo || prevState?.contactInfo,
          workExperience:resumeInfo?.workExperience || prevState?.workExperience,
          education:resumeInfo?.education || prevState?.education,
          skills:resumeInfo?.skills || prevState?.skills,
          projects:resumeInfo?.projects || prevState?.projects,
          certifications:resumeInfo?.certifications || prevState?.certifications,
          languages:resumeInfo?.languages || prevState?.languages,
          interests:resumeInfo?.interests || prevState?.interests,
          
        }))
      }
    } catch (error) {
      console.error('error in fetching resume',error)
    } 
  }

  //upload thumbnail and resume profile img
  const uploadResumeImages = async () => {}

  const updateResumeDetails = async () => {}

  //delete reusme
  const handleDeleteResume = async () => {}

  //download resume
  const reactToPrintFn = useReactToPrint({contentRef: resumeDownloadRef});

  //fxn to update basewith based on the resume container size
  const updateBaseWidth = () => {};

  useEffect(()=> {
    updateBaseWidth();
    window.addEventListener('resize',updateBaseWidth);

    if (resumeId){
      fetchResumeInfoById();
    }

    return () => {
      window.removeEventListener("resize",updateBaseWidth)
    }
  },[])
  return (
    <DashboardLayout>
      <div className=' mx-auto'>
        <div className='flex items-center justify-between gap-5 bg-white rounded-lg border border-purple-100 py-3 px-4 mb-4  '>
          <TitleInput
          title={resumeData.title}
          setTitle={(value)=>
            setResumeData((prevState)=>({
              ...prevState,
              title:value,
            }))
          }
          />

          <div className='flex items-center gap-4'>
            <button className='btn-small-light '
            onClick={()=> setOpenThemeSelector(true)}
            >
              <LuPalette className='text-[16px]'/>
              <span className='hidden md:block'>Change Theme</span>
            </button>

            <button className='btn-small-light ' onClick={handleDeleteResume}>
              <LuTrash className='text-[16px]'/>
              <span className='hidden md:block'>Delete</span>
            </button>

            <button className='btn-small-light ' onClick={()=> setOpenPreviewModal(true)}>
              <LuDownload className='text-[16px]'/>
              <span className='hidden md:block'>Preview and download</span>
            </button>


          </div>
        </div>

        <div className='grid grid-cols-1  md:grid-cols-2 gap-5'>
          <div className='bg-white rounded-lg border border-purple-100 overflow-hidden '>

            <StepProgress progress={90}/>
            {renderForm()}

            <div className='mx-5'>
              {errorMsg && (
                <div className='flex items-center gap-2 text-[11px] font-medium text-amber-600 bg-amber-100 px-2 py-0.5 my-1 rounded-lg'>
                  <LuCircleAlert className='text-md'/> {errorMsg}
                </div>
              )}

              <div className='flex items-end justify-end gap-3 mt-3 mb-5'>
                <button className='btn-small-light' onClick={goBack} disabled={isLoading}>
                  <LuArrowLeft className='text-[16px]'/>
                  Back
                </button>
                <button className='btn-small-light' onClick={uploadResumeImages} disabled={isLoading}>
                  <LuSave className='text-[16px]'/>
                  {isLoading? "updating...": "save and exit"}
                </button>
                <button className='btn-small' onClick={validateAndNext} disabled={isLoading}>
                  {currentPage === 'additionalInfo' && (
                    <LuDownload className='text-[16px]'/>
                  )}
                  {currentPage === 'additionalInfo'? "preview and downlaod" : "next"}
                  {currentPage !== 'addionalInfo' && (
                    <LuArrowLeft className='text-[16px]'/>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div ref={resumeRef} className='h-[100vh]'>
              {/* reusme template */}
        </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default EditResume