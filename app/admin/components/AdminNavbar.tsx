'use client';

import React, { useContext } from 'react';
import { UIContext } from '@/context';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';

const AdminNavbar = () => {
   const { toggleSideMenu } = useContext(UIContext);

   return (
      <AppBar>
         <Toolbar>
            <Link
               href="/"
               passHref
               style={{
                  color: 'black',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
               }}
            >
               <Typography variant="h6">Teslo |</Typography>
               <Typography sx={{ ml: 0.5 }}>Shop</Typography>
            </Link>
            <Box flex={1} />

            <Button onClick={toggleSideMenu}>Menú</Button>
         </Toolbar>
      </AppBar>
   );
};

export default AdminNavbar;
