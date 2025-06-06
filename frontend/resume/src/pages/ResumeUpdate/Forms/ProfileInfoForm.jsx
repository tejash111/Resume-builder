import React from 'react'
import ProfilePhotoSelector from "../../../componets//inputs/ProfilePhotoSelector"
import Input from "../../../componets/inputs/Input"

const ProfileInfoForm = ({profileData,updateSection,onNext}) => {
  return (
    <div className='px-5 pt-5 '>
        <h2 className='text-lg text-gray-900 font-semibold'>personal Information</h2>

        <div className='mt-4'>
            <ProfilePhotoSelector
            image={profileData?.profileImg || profileData?.profilePreviewUrl} 
            setImage={(value)=>updateSection('profileImg',value)}
            preview={profileData?.profilePreviewUrl}
            setPreview={(value)=>updateSection("profilePreviewUrl",value)}
            />

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <Input
                value={profileData.fullName || ""}
                onChange={({target})=>updateSection("fullName",target.value)}
                label="full name"
                placeholder="john"
                type="text"
                />
                 <Input
                value={profileData.designation || ""}
                onChange={({target})=>updateSection("designation",target.value)}
                label="Designation"
                placeholder="developer"
                type="text"
                />
                
            </div>
        </div>
    </div>
  )
}

export default ProfileInfoForm