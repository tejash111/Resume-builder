import React from 'react'
import Input from "../../../componets/inputs/Input"
import {Luplus,Lutrash2} from "react-icons/lu"

const WorkExperienceForm = ({workExperience,updateArrayItems,addArrayItem,removeArrayItem}) => {
  return (
    <div className='px-5 pt-5'> 
        <h2 className='text-lg font-semibold text-gray-900'>Work experience</h2>

        <div className='mt-4 flex flex-col gap-4 mb-3'>
            {workExperience.map((experience,index)=>(
                <div key={index} className='border border-gray-200/80 p-4 rounded-lg relative'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <Input
                    label="Company"
                    placeholder="Google"
                    type="text"
                    value={experience.company || ""}
                    onChange={({target}) =>updateArrayItems(index,"company",target.value)}
                    />

                    <Input
                    label="Role"
                    placeholder="Frontend Developer"
                    type="text"
                    value={experience.role || ""}
                    onChange={({target}) =>updateArrayItems(index,"role",target.value)}
                    />

                    <Input
                    label="Start Date"
                    type="month"
                    value={experience.startDate || ""}
                    onChange={({target}) =>updateArrayItems(index,"startDate",target.value)}
                    />

                    <Input
                    label="End data"

                    type="month"
                    value={experience.endDate || ""}
                    onChange={({target}) =>updateArrayItems(index,"endDate",target.value)}
                    />

                    <div className='mt-4 '>
                      <label className='text-xs font-medium text-slate-600'>
                        Description
                        </label>
                        <textarea placeholder='what did u do in this role?' className='form-input w-full mt-1' rows={3}
                        onChange={({target})=>updateArrayItems(index,'description',target.value)}
                        /> 
                    </div>

                    {workExperience.length>1 && (
                        <button
                        type='button'
                        className='absolute top-3 right-3 text-sm text-red-600 hover:underline cursor-pointer'
                        onClick={()=>removeArrayItem(index)}
                        >
                          <Lutrash2/>
                        </button>
                    )}
                </div>
                </div>
            ))}

            <button
            className='self-start flex items-center gap-2 px-4 py-2 rounded bg-purple-100 text-purple-800 text-sm font-medium hover:bg-purple-200 cursor-pointer'
            type='button'
            onClick={() =>{
              addArrayItem({
                company:"",
                role:"",
                startDate:'',
                endDate:"",
                description:"",
              })
            }}
            >
              <Luplus/> Add work experience
            </button>
        </div>
    </div>
  )
}

export default WorkExperienceForm