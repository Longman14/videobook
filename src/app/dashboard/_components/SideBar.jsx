"use client"
import React, { useContext } from 'react'
import Image from 'next/image'
import { HiOutlineShieldCheck, HiOutlineSquare3Stack3D, HiOutlineHome, HiOutlinePower } from 'react-icons/hi2'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Progress } from '@/components/ui/progress'
import { UserCourseListContext } from '@/app/_context/UserCourseListContext'
function SideBar() {
    const {userCourseList, setUserCourseList} =useContext(UserCourseListContext)
    const Menu = [
        {
            id:1,
            name: 'Home',
            icon:<HiOutlineHome/>,
            path:'/dashboard'
        },
        {
            id:2,
            name: 'Explore',
            icon:<HiOutlineSquare3Stack3D/>,
            path:'/dashboard/explore'
        },
        {
            id:3,
            name: 'Upgrade',
            icon:<HiOutlineShieldCheck/>,
            path:'/dashboard/upgrade'
        },
        {
            id:4,
            name: 'Logout',
            icon:<HiOutlinePower/>,
            path:'/dashboard/logout'
        }
        ]
        const path = usePathname();
  return (
    <div className='fixed h-full md:w-64 p-5 shadow-md'>
        <Image src={"/logo.svg"} width={120} height={120} style={{ paddingLeft: '50px' }}/>
        <hr className='mb-5'/>
        <ul>
        {/* eslint-disable react/jsx-key */}
            {Menu.map((item, index)=>(
                <Link href={item.path}>
                <div key={item.id} className={`flex items-center gap-2 text-gray-600 p-3 cursor-pointer hover:text-black hover:bg-gray-100 rounded-lg mb-3 ${item.path==path&&'bg-gray-100 text-black'}`}>
                    <div className='text-2xl'>{item.icon}</div>
                    <h2>{item.name}</h2>
                </div>
                </Link>
            ))}
            {/* eslint-enable react/jsx-key */}
        </ul>
        <div className='absolute bottom-10 w-[80%]'>
            <Progress value={(userCourseList?.length/5)*100}/>
            <h2 className='text-sm my-2'>{userCourseList?.length} Out of 5 Courses Created</h2>
            <h2 className='text-xs text-gray-500'>Upgrade your plan for unlimited course generation</h2>
        </div>
    </div>
  )
}

export default SideBar