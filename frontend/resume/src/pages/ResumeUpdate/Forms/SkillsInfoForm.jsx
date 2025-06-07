import React from 'react'
import Input from "../../../componets/inputs/Input"

import { LuPlus, LuTrash2 } from "react-icons/lu";
import RatingInput from '../../../componets/inputs/RatingInput';

const SkillsInfoForm = ({ skillsInfo, updateArrayItems, addArrayItem, removeArrayItem }) => {
    return (
        <div className='px-5 pt-5'>
            <h2 className='text-lg font-semibold text-gray-900'>Skills</h2>

            <div className='mt-4 flex flex-col gap-4 mb-3'>
                {skillsInfo.map((skill, index) => (
                    <div key={index} className='border border-gray-200/80 p-4 rounded-lg relative'>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <Input
                                label="Skills name"
                                placeholder="Javascript"
                                type="text"
                                value={skill.name || ""}
                                onChange={({ target }) =>
                                    updateArrayItems(index, "name", target.value)
                                }
                            />
                            
                            <div className='flex flex-col'>
                                <label className='text-[13px] text-slate-800 mb-1'>
                                    Profiency ({skill.progress /20 || 0}/5)
                                </label>
                                <div className='mt-5'>
                                    <RatingInput
                                    value={skill.progress || 0}
                                    total={5}
                                    onChange={(newValue)=> updateArrayItems(index,'progress',newValue)}
                                    
                                    />
                                </div>
                            </div>



                            {skillsInfo.length > 1 && (
                                <button
                                    type='button'
                                    className='absolute top-3 right-3 text-sm text-red-600 hover:underline cursor-pointer'
                                    onClick={() => removeArrayItem(index)}
                                >
                                    <LuTrash2 />
                                </button>
                            )}
                        </div>
                    </div>
                ))}

                <button
                    className='self-start flex items-center gap-2 px-4 py-2 rounded bg-purple-100 text-purple-800 text-sm font-medium hover:bg-purple-200 cursor-pointer'
                    type='button'
                    onClick={() => {
                        addArrayItem({
                            name: "",
                            progress : 0,
                        })
                    }}
                >
                    <LuPlus /> Add Skill
                </button>
            </div>
        </div>
    )
}

export default SkillsInfoForm