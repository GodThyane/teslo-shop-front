'use client';

import React from 'react';
import { Button } from '@mui/material';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface Props {
   url: string;
   text: string;
}

const NavbarButtonCategory = ({ url, text }: Props) => {
   const pathName = usePathname();
   const myUrl = new URL(url, process.env.NEXT_PUBLIC_BASE_URL || '');

   return (
      <Link href={myUrl} passHref style={{ textDecoration: 'none' }}>
         <Button color={pathName === url ? 'primary' : 'info'}>{text}</Button>
      </Link>
   );
};

export default NavbarButtonCategory;
