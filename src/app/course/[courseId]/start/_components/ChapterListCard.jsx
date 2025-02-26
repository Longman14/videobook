import React from 'react'
import { HiOutlineClock } from 'react-icons/hi2'

function ChapterListCard({chapter, index}) {
  return (
    <div className='grid grid-cols-5 p-4 items-center border-b'>
        
        <div className='ml-5 col-span-5'>
                <h2 className='font-medium'>{chapter?.chapterName}</h2>
                <h2 className='flex items-center gap-2 text-sm text-primary'> <HiOutlineClock/> {chapter?.duration}</h2>
        </div>
    </div>
  )
}

export default ChapterListCard