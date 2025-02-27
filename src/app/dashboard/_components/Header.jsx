import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Header() {
  return (
    <div className='flex items-center justify-between align-middle pr-6 pt-5 shadow-sm'>
      <Link href={'/'}>
        <Image src={'/favicon.svg'} width={70} height={70}/>
        </Link>
        <UserButton/>

    </div>
  )
}

export default Header