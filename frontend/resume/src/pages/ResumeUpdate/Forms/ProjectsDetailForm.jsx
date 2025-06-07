import React from 'react'
import Input from "../../../componets/inputs/Input"

import { LuPlus, LuTrash2 } from "react-icons/lu";

const ProjectsDetailForm = ({ projectInfo, updateArrayItems, addArrayItem, removeArrayItem }) => {
    return (
        <div className='px-5 pt-5'>
            <h2 className='text-lg font-semibold text-gray-900'>Project</h2>

            <div className='mt-4 flex flex-col gap-4 mb-3'>
                {projectInfo.map((project, index) => (
                    <div key={index} className='border border-gray-200/80 p-4 rounded-lg relative'>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div className='col-span-2'>

                           
                            <Input
                                label="Project Title"
                                placeholder="E-commerce"
                                type="text"
                                value={project.title || ""}
                                onChange={({ target }) =>
                                    updateArrayItems(index, "title", target.value)
                                }
                            />

                            </div>

                            <div className='col-span-2'>
                                <label className='text-xs font-medium text-slate-600 '>
                                    Description
                                </label>
                                <textarea 
                                placeholder='short description about project'
                                className='form-input w-full mt-1'
                                rows={3}
                                value={project.description || ""}
                                onChange={({target})=> updateArrayItems(index,"description",target.value)}
                                ></textarea>
                            </div>

                             <Input
                                label="Github Link"
                                placeholder="https://github.com/username"
                                type="url"
                                value={project.github || ""}
                                onChange={({ target }) =>
                                    updateArrayItems(index, "github", target.value)
                                }
                            />
                             <Input
                                label="Live URL"
                                placeholder="https://yourproject.live"
                                type="url"
                                value={project.liveDemo || ""}
                                onChange={({ target }) =>
                                    updateArrayItems(index, "liveDemo", target.value)
                                }
                            />

                        </div>


                            {projectInfo.length > 1 && (
                                <button
                                    type='button'
                                    className='absolute top-3 right-3 text-sm text-red-600 hover:underline cursor-pointer'
                                    onClick={() => removeArrayItem(index)}
                                >
                                    <LuTrash2 />
                                </button>
                            )}
                             
                        
                    </div>
                ))}

                <button
                    className='self-start flex items-center gap-2 px-4 py-2 rounded bg-purple-100 text-purple-800 text-sm font-medium hover:bg-purple-200 cursor-pointer'
                    type='button'
                    onClick={() => {
                        addArrayItem({
                            title:"",
                            description:"",
                            github:"",
                            liveDemo:"",
                        })
                    }}
                >
                    <LuPlus /> Add Project
                </button>
            </div>
        </div>
    )
}

export default ProjectsDetailForm