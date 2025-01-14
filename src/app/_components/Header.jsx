import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';

function Header() {
  return (
    <div className="flex justify-between items-center px-5 py-1 shadow-md">
      <Image src={'/logo.svg'} width={150} height={50} alt="Logo" />
      <Button>Get Started</Button>
    </div>
  );
}

export default Header;
