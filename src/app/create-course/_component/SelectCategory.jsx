import React from 'react';
import CategoryList from '@/app/_shared/CategoryList'
import Image from 'next/image';
function SelectCategory() {
  return (
    <div className='grid grid-cols-2 md:grid-cols-3  lg:grid-cols-3  gap-10 px-10 md:px-25'>
        {CategoryList.map((item, index) =>(
            <div className='flex flex-col p-5 border items-center rounded-xl hover:border-primary hover:bg-blue-50 cursor-pointer'>
                <Image src={item.icon} alt={item.name}
                width={50}
                height={50}/>
                <h2>{item.name}</h2>
            </div>
        ))}
    </div>
  )
}

export default SelectCategory