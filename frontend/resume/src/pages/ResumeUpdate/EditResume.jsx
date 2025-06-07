import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import DashboardLayout from '../../componets/layouts/DashboardLayout';
import { useReactToPrint } from 'react-to-print'
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/ApiPaths';
import TitleInput from '../../componets/inputs/TitleInput';
import { LuArrowLeft, LuArrowRight, LuCircleAlert, LuDownload, LuPalette, LuSave, LuTrash } from 'react-icons/lu';
import StepProgress from '../../componets/StepProgress';
import ProfileInfoForm from './Forms/ProfileInfoForm';
import ContactInfoForm from './Forms/ContactInfoForm';
import WorkExperienceForm from './Forms/WorkExperienceForm';
import EducationDetailForm from './Forms/EducationDetailForm';
import SkillsInfoForm from './Forms/SkillsInfoForm';
import ProjectsDetailForm from './Forms/ProjectsDetailForm';
import CertificateInfoForm from './Forms/CertificateInfoForm';

const EditResume = () => {
  const { resumeId } = useParams()
  const navigate = useNavigate();

  const resumeRef = useRef(null)
  const resumeDownloadRef = useRef(null);

  const [basewidth, setBaseWidth] = useState(800);

  const [openThemeSelector, setOpenThemeSelector] = useState(false)
  const [openPreviewModal, setOpenPreviewModal] = useState(false)

  const [currentPage, setCurrentPage] = useState('profile-info')
  const [progress, setProgress] = useState(0)
  const [resumeData, setResumeData] = useState({
    title: "",
    thumbnailLink: "",
    profileInfo: {
      profileImg: null,
      profilePreviewUrl: '',
      fullName: "",
      designation: "",
      summary: "",
    },
    template: {
      theme: "",
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
      {
        company: "",
        role: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
    education: [
      {
        degree: "",
        institution: "",
        startDate: "",
        endDate: ""
      },
    ],
    skills: [
      {
        name: "",
        progress: 0,
      },
    ],
    projects: [
      {
        title: "",
        description: "",
        github: "",
        liveDemo: "",
      },
    ],
    certifications: [
      {
        title: "",
        issuer: "",
        year: "",
      }
    ],
    languages: [
      {
        name: "",
        progress: 0
      },
    ],
    interests: [""],
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  //validate inputs
  const validateAndNext = (e) => {
    const errors = [];

    switch (currentPage) {
      case "profile-info":
        const { fullName, designation } = resumeData.profileInfo;
        if (!fullName.trim()) errors.push("Full name is required");
        if (!designation.trim()) errors.push("Designaition is required");
        break;

      case "contact-info":
        const { email, phone } = resumeData.contactInfo;
        if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email))
          errors.push("Valid email is required.");
        if (!phone.trim())
          errors.push("Valid 10-digit phone number is required");
        break;

      case "work-experience":
        resumeData.workExperience.forEach(
          ({ company, role, startDate, endDate }, index) => {
            if (!company.trim())
              errors.push(`Company is required in experience ${index + 1}`);
            if (!role.trim())
              errors.push(`Role is required in experience ${index + 1}`);
            if (!startDate || !endDate)
              errors.push(`Start and End dates are required in experience ${index + 1}`);
          }
        );
        break;

      case "education-info":
        resumeData.education.forEach(
          ({ degree, institution, startDate, endDate }, index) => {
            if (!degree.trim())
              errors.push(`Degree is required in education ${index + 1}`);
            if (!institution.trim())
              errors.push(`Institution is required in education ${index + 1}`);
            if (!startDate || !endDate)
              errors.push(`Start and End dates are required in education ${index + 1}`);
          }
        );
        break;

      case "skills":
        resumeData.skills.forEach(({ name, progress }, index) => {
          if (!name.trim())
            errors.push(`Skill name is required in skill ${index + 1}`);
          if (progress < 1 || progress > 100)
            errors.push(`Skill progress must be between 1 and 100 in skill ${index + 1}`);
        });
        break;

      case "projects":
        resumeData.projects.forEach(({ title, description }, index) => {
          if (!title.trim())
            errors.push(`Project title is required in project ${index + 1}`);
          if (!description.trim())
            errors.push(`Project description is required in project ${index + 1}`);
        });
        break;

      case "certifications":
        resumeData.certifications.forEach(({ title, issuer }, index) => {
          if (!title.trim())
            errors.push(`Certification title is required in certification ${index + 1}`);
          if (!issuer.trim())
            errors.push(`Issuer is required in certification ${index + 1}`);
        });
        break;

      default:
        break;
    }

    if (errors.length > 0) {
      setErrorMsg(errors.join(", "));
      return;
    }

    //move to next step
    setErrorMsg("");
    goToNextStep();

  };

  //function to navigate to the next page
  const goToNextStep = () => {
    const pages = [
      "profile-info",
      "contact-info",
      "work-experience",
      "education-info",
      "skills",
      "projects",
      "certifications",

    ];

    if (currentPage === "certifications") setOpenPreviewModal(true);

    const currentIndex = pages.indexOf(currentPage);
    const nextIndex = currentIndex + 1;
    if (currentIndex !== -1 && currentIndex < pages.length - 1) {
      setCurrentPage(pages[nextIndex]);

      //set progress as percnetage
      const percent = Math.round((nextIndex / (pages.length - 1)) * 100);
      setProgress(percent);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  //function to navigate to the previous page
  const goBack = () => {
    const pages = [
      "profile-info",
      "contact-info",
      "work-experience",
      "education-info",
      "skills",
      "projects",
      "certifications",

    ];
    if (currentPage === "profile-info") navigate("/dashboard")

    const currentIndex = pages.indexOf(currentPage);
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentPage(pages[prevIndex])
    }

    //set progress as percnetage
    const percent = Math.round((prevIndex / (pages.length - 1)) * 100);
    setProgress(percent);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }


const renderForm = () => {
  switch (currentPage) {
    case "profile-info":
      return (
        <ProfileInfoForm
          profileData={resumeData?.profileInfo}
          updateSection={(key, value) => {
            updateSection('profileInfo', key, value);
          }}
          onNext={validateAndNext}
        />
      );

    case "contact-info":
      return (
        <ContactInfoForm
          contactInfo={resumeData?.contactInfo}
          updateSection={(key, value) => {
            updateSection("contactInfo", key, value);
          }}
        />
      )

    case "work-experience":
      return (
        <WorkExperienceForm
          workExperience={resumeData?.workExperience}
          updateArrayItems={(index, key, value) => {
            updateArrayItems("workExperience", index, key, value);
          }}
          addArrayItem={(newItem) => addArrayItem("workExperience", newItem)}
          removeArrayItem={(index) => removeArrayItem("workExperience", index)}
        />
      )

    case "education-info":
      return (
        <EducationDetailForm
          educationInfo={resumeData?.education}
          updateArrayItems={(index, key, value) => {
            updateArrayItems("education", index, key, value);
          }}
          addArrayItem={(newItem) => addArrayItem("education", newItem)}
          removeArrayItem={(index) => removeArrayItem("education", index)}
        />
      )
    case "skills":
      return (
        <SkillsInfoForm
          skillsInfo={resumeData?.skills}
          updateArrayItems={(index, key, value) => {
            updateArrayItems("skills", index, key, value);
          }}
          addArrayItem={(newItem) => addArrayItem("skills", newItem)}
          removeArrayItem={(index) => removeArrayItem("skills", index)}
        />
      )
    case "projects":
      return (
        <ProjectsDetailForm
          projectInfo={resumeData?.projects}
          updateArrayItems={(index, key, value) => {
            updateArrayItems("projects", index, key, value);
          }}
          addArrayItem={(newItem) => addArrayItem("projects", newItem)}
          removeArrayItem={(index) => removeArrayItem("projects", index)}
        />
      )
    case "certifications":
      return (
        <CertificateInfoForm
          certificateInfo={resumeData?.certifications}
          updateArrayItems={(index, key, value) => {
            updateArrayItems("certifications", index, key, value);
          }}
          addArrayItem={(newItem) => addArrayItem("certifications", newItem)}
          removeArrayItem={(index) => removeArrayItem("certifications", index)}
        />
      )
    default:
      return null;
  };
};

//update simple nested object (like profileinfo , contact info etc.)
const updateSection = (section, key, value) => {
  setResumeData((prev) => ({
    ...prev,
    [section]: {
      ...prev[section],
      [key]: value,
    },
  }))
};

//update array item like workexp[0] , sills , etc
const updateArrayItems = (section, index, key, value) => {
  setResumeData((prev) => {
    const updatedArray = [...prev[section]];

    if (key === null) {
      updatedArray[index] = value;  //for simple strings like in interests
    } else {
      updatedArray[index] = {
        ...updatedArray[index],
        [key]: value,
      }
    }

    return {
      ...prev,
      [section]: updatedArray,
    };
  });
};

//add items to array 
const addArrayItem = (section, newItem) => {
  setResumeData((prev) => ({
    ...prev,
    [section]: [...prev[section], newItem],
  }));
}

//remove items from array
const removeArrayItem = (section, index) => {
  setResumeData((prev) => {
    const updatedArray = [...prev[section]];
    updatedArray.splice(index, 1);
    return {
      ...prev,
      [section]: updatedArray,
    };
  })
}

//fetch resume info by id
const fetchResumeInfoById = async () => {
  try {
    const response = await axiosInstance.get(
      API_PATHS.RESUME.GET_BY_ID(resumeId)
    );

    if (response.data && response.data.profileInfo) {
      const resumeInfo = response.data;

      setResumeData((prevState) => ({
        ...prevState,
        title: resumeInfo?.title || 'untitled',
        template: resumeInfo?.template || prevState?.template,
        profileInfo: resumeInfo?.profileInfo || prevState?.profileInfo,
        contactInfo: resumeInfo?.contactInfo || prevState?.contactInfo,
        workExperience: resumeInfo?.workExperience || prevState?.workExperience,
        education: resumeInfo?.education || prevState?.education,
        skills: resumeInfo?.skills || prevState?.skills,
        projects: resumeInfo?.projects || prevState?.projects,
        certifications: resumeInfo?.certifications || prevState?.certifications,
        languages: resumeInfo?.languages || prevState?.languages,
        interests: resumeInfo?.interests || prevState?.interests,

      }))
    }
  } catch (error) {
    console.error('error in fetching resume', error)
  }
}

//upload thumbnail and resume profile img
const uploadResumeImages = async () => { }

const updateResumeDetails = async () => {

}

//delete reusme
const handleDeleteResume = async () => { }

//download resume
const reactToPrintFn = useReactToPrint({ contentRef: resumeDownloadRef });

//fxn to update basewith based on the resume container size
const updateBaseWidth = () => { };

useEffect(() => {
  updateBaseWidth();
  window.addEventListener('resize', updateBaseWidth);

  if (resumeId) {
    fetchResumeInfoById();
  }

  return () => {
    window.removeEventListener("resize", updateBaseWidth)
  }
}, [])

return (
  <DashboardLayout>
    <div className=' mx-auto'>
      <div className='flex items-center justify-between gap-5 bg-white rounded-lg border border-purple-100 py-3 px-4 mb-4  '>
        <TitleInput
          title={resumeData.title}
          setTitle={(value) =>
            setResumeData((prevState) => ({
              ...prevState,
              title: value,
            }))
          }
        />

        <div className='flex items-center gap-4'>
          <button className='btn-small-light '
            onClick={() => setOpenThemeSelector(true)}
          >
            <LuPalette className='text-[16px]' />
            <span className='hidden md:block'>Change Theme</span>
          </button>

          <button className='btn-small-light ' onClick={handleDeleteResume}>
            <LuTrash className='text-[16px]' />
            <span className='hidden md:block'>Delete</span>
          </button>

          <button className='btn-small-light ' onClick={() => setOpenPreviewModal(true)}>
            <LuDownload className='text-[16px]' />
            <span className='hidden md:block'>Preview and download</span>
          </button>


        </div>
      </div>

      <div className='grid grid-cols-1  md:grid-cols-2 gap-5'>
        <div className='bg-white rounded-lg border border-purple-100 overflow-hidden '>

          <StepProgress progress={90} />
          {renderForm()}

          <div className='mx-5'>
            {errorMsg && (
              <div className='flex items-center gap-2 text-[11px] font-medium text-amber-600 bg-amber-100 px-2 py-0.5 my-1 rounded-lg'>
                <LuCircleAlert className='text-md' /> {errorMsg}
              </div>
            )}

            <div className='flex items-end justify-end gap-3 mt-3 mb-5'>
              <button className='btn-small-light' onClick={goBack} disabled={isLoading}>
                <LuArrowLeft className='text-[16px]' />
                Back
              </button>
              <button className='btn-small-light' onClick={uploadResumeImages} disabled={isLoading}>
                <LuSave className='text-[16px]' />
                {isLoading ? "updating..." : "save and exit"}
              </button>
              <button className='btn-small' onClick={validateAndNext} disabled={isLoading}>
                {currentPage === 'certifications' && (
                  <LuDownload className='text-[16px]' />
                )}
                {currentPage === 'certifications' ? "preview and downlaod" : "next"}
                {currentPage !== 'certifications' && (
                  <LuArrowRight className='text-[16px]' />
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