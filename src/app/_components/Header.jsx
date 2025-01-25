import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';

function Header() {
  return (
    <div className="flex justify-between items-center px-5 py-1 shadow-md">
      <Image src={'/logo.svg'} width={150} height={50} alt="Logo" />
      <a
          className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-secondary focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
          href="/dashboard"
        >
          Get Started
        </a>
    </div>
  );
}

export default Header;
