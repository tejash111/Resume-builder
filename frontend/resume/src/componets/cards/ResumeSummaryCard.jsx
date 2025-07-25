import React, { useEffect, useState } from 'react'
import { getLightColorFromImage } from '../../utils/helper';

const ResumeSummaryCard = ({imgUrl,title,lastUpdated,onSelect}) => {

  const [bgColor,setBgColor]=useState('#ffffff');

  useEffect(()=>{
    
  })
  return (
    <div onClick={onSelect} className='h-[300px] flex flex-col items-center justify-between backdrop-blur-[22px] rounded-lg border border-gray-200 hover:border-purple-300 overflow-hidden cursor-pointer'
    
    > 
        <div className='p-4'>
            {
                imgUrl? (
                    <img src={imgUrl} alt="" className='w-[100%] h-[200px] rounded'/>
                ) : (<div></div>
           ) }
        </div>
        <div className='w-full backdrop-blur-[22px] px-4 py-3'>
            <h5 className='text-sm font-medium truncate overflow-hidden whitespace-nowrap'>{title}</h5>
            <p className='text-xs font-medium text-gray-500 mt-0.5 '>last updated: {lastUpdated}</p>
        </div>
    </div>
  )
}

export default ResumeSummaryCard