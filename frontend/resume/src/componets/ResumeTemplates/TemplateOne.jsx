import React, { useEffect, useRef, useState } from 'react'
import {
    LuMapPinHouse,
    LuMail,
    LuPhone,
    LuRss,
    LuGithub,
    LuUser
} from "react-icons/lu";
import { RiLinkedinLine } from "react-icons/ri"
import ContactInfo from './components/ContactInfo';
import EducationInfo from './components/EducationInfo';
import { formatYearMonth } from '../../utils/helper';
import WorkExperience from './components/WorkExperience';
import ProjectInfo from './components/ProjectInfo';
import CertificationInfo from './components/CertificationInfo';
import { CiLocationOn } from "react-icons/ci";

const DEFAULT_THEME = ["#EBFDFF", "#A1F4FD", "#CEFAFE", "#00B8DB", "#4A5565"];

const Title = ({ text, color }) => {
    return (
        <div className="relative w-fit mb-2.5">
            <span
                className="absolute bottom-0 left-0 w-full h-2"
                style={{ backgroundColor: color }}
            />
            <h2 className="relative text-sm font-bold uppercase ">{text}</h2>
        </div>
    );
};

const SocialLinks = ({ linkedin, github, website }) => (
    <div className="flex flex-wrap justify-center gap-4  text-sm">
        {linkedin && (
            <a href={linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline"><RiLinkedinLine />LinkedIn</a>
        )}
        {github && (
            <a href={github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline"><LuGithub />GitHub</a>
        )}
        {website && (
            <a href={website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline"><LuRss />Portfolio</a>
        )}
    </div>
);

const TemplateOne = ({
    resumeData,
    colorPalette,
    containerWidth
}) => {
    const themeColors = colorPalette?.length > 0 ? colorPalette : DEFAULT_THEME;
    const resumeRef = useRef(null);
    const [basewidth, setBaseWidth] = useState(800); //default value
    const [scale, setScale] = useState(1);
    console.log(JSON.stringify(resumeData));
    

    useEffect(() => {
        const actualBaseWidth = resumeRef.current.offsetWidth;
        setBaseWidth(actualBaseWidth);
        setScale(containerWidth / basewidth);
    }, [containerWidth]);

    return (
        <div
            ref={resumeRef}
            className="p-6 px-12 bg-white max-w-3xl mx-auto shadow"
            style={{
                transform: containerWidth > 0 ? `scale(${scale})` : "none",
                transformOrigin: "top left",
                width: containerWidth > 0 ? `${basewidth}px` : "auto",
                height: "auto",
            }}
        >
            {/* Header */}
            <div className="flex flex-col items-center text-center border-b pb-2 mt-3">
              
            
                <h1 className='text-4xl font-bold '>{resumeData.profileInfo?.fullName}</h1>
                <h1 className='text-large '>{resumeData.profileInfo?.designation}</h1>

                <div className="flex flex-wrap justify-center gap-3 mt-2 text-sm text-gray-700">
                    {resumeData.contactInfo?.location && (
                        <span className="flex items-center gap-1"><CiLocationOn/>{resumeData.contactInfo.location}</span>
                    )}
                    {resumeData.contactInfo?.email && (
                        <span className="flex items-center gap-1"><LuMail />{resumeData.contactInfo.email}</span>
                    )}
                    {resumeData.contactInfo?.phone && (
                        <span className="flex items-center gap-1"><LuPhone />{resumeData.contactInfo.phone}</span>
                    )}
                </div >
                <div className='text-gray-700 text-sm'>
                 <SocialLinks
                    linkedin={resumeData.contactInfo?.linkedin}
                    github={resumeData.contactInfo?.github}
                    website={resumeData.contactInfo?.website}
                />
                </div>
                
            </div>

            
            <div className="mt-2">
                <div>
                    <h1 className='text-xl font-bold '>SUMMARY</h1>
                    <hr className='opacity-40 '/>
                    <h1 className='mt-1'>{resumeData.profileInfo?.summary}</h1>
                </div>
                {/* Skills & Tools */}
                <div className='mt-3'>
                    <h1 className='text-xl font-bold'>TECHNICAL SKILLS</h1>
                    <hr className='opacity-40 mb-1'/>
                    <h1>{resumeData.skills?.name}</h1>
                </div>
                
            </div>

            {/* Projects */}
            <div className="mt-3">
                <h1 className='text-xl font-bold '>PROJECTS</h1>
                <hr className='opacity-40 '/>
                {resumeData.projects?.map((project, index) => (
                    <ProjectInfo
                        key={`project_${index}`}
                        title={project.title}
                        description={project.description}
                        githubLink={project.github}
                        liveDemoUrl={project.liveDemo}
                        bgColor={themeColors[2]}
                    />
                ))}
            </div>
            

            {/* Work Experience */}
            <div className="mt-3">
                <h1 className='text-xl font-bold '>EXPERIENCE</h1>
                <hr className='opacity-40 mb-1'/>
                {resumeData.workExperience?.map((data, index) => (
                    <WorkExperience
                        key={`work_${index}`}
                        company={data.company}
                        role={data.role}
                        duration={`${formatYearMonth(data.startDate)} - ${formatYearMonth(data.endDate)}`}
                        durationColor={themeColors[4]}
                        description={data.description}
                    />
                ))}
            </div>

            {/* Education */}
            <div className="mt-3">
                <h1 className='text-xl font-bold '>EDUCATION</h1>
                 <hr className='opacity-40 mb-1'/>
                {resumeData.education?.map((data, index) => (
                    <EducationInfo
                        key={`education_${index}`}
                        degree={data.degree}
                        institution={data.institution}
                        duration={`${formatYearMonth(data.startDate)} - ${formatYearMonth(data.endDate)}`}
                    />
                ))}
            </div>

            

            {/* Certifications */}
            {resumeData.certifications && resumeData.certifications.length > 0 && (
                <div className="mt-3">
                    <h1 className='text-xl font-bold '>CERTIFICATION</h1>
                 <hr className='opacity-40 mb-1'/>
                    <div className="grid grid-cols-2 gap-2">
                        {resumeData.certifications.map((data, index) => (
                            <CertificationInfo
                                key={`cert_${index}`}
                                title={data.title}
                                issuer={data.issuer}
                                year={data.year}
                                bgColor={themeColors[2]}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default TemplateOne