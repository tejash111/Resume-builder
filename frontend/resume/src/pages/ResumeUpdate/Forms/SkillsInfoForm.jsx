import React from 'react'
import Input from "../../../componets/inputs/Input"

import { LuPlus, LuTrash2 } from "react-icons/lu";


const SkillsInfoForm = ({ skillsInfo, updateSection }) => {
    return (
        <div className='px-5 pt-5'>
            <h2 className='text-lg font-semibold text-gray-900'>Skills</h2>
            <div className='mt-4 '>
                <label className='text-xs font-medium text-slate-600'>

                </label>
                <textarea placeholder='React,Nextjs,node,redis...' className='form-input w-full mt-1' rows={3}
                    value={skillsInfo?.name || ""}
                    onChange={({ target }) => updateSection('name', target.value)}
                />

            </div>

        </div>
    )
}

export default SkillsInfoForm