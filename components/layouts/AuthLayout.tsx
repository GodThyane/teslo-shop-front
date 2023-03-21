'use client';

import { Box } from '@mui/material';
import React from 'react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
   return (
      <>
         <main>
            <Box
               display="flex"
               justifyContent="center"
               alignItems="center"
               height="calc(100vh - 200px)"
            >
               {children}
            </Box>
         </main>
      </>
   );
};

export default AuthLayout;
