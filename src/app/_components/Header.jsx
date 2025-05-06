import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function Header() {
  return (
    <div className="flex justify-between items-center px-5 py-1 shadow-md">
      <Link href={'/'}>
        <Image src={'/logo.svg'} width={100} height={50} alt="Logo" className="mr-auto" />
      </Link>
      <Link href={'/dashboard'} passHref>
        <Button
          className="hidden md:block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-secondary focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
        >
          Get Started
        </Button>
      </Link>
    </div>
  );
}

export default Header;
