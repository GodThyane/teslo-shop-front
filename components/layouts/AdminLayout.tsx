'use client';

import React from 'react';
import SideMenu from '@/components/ui/SideMenu';
import AdminNavbar from '@/app/admin/components/AdminNavbar';
import { Box, Typography } from '@mui/material';

const AdminLayout = ({
   children,
   title,
   subTitle,
   icon,
}: {
   children: React.ReactNode;
   title: string;
   subTitle: string;
   icon?: JSX.Element;
}) => {
   return (
      <>
         <AdminNavbar />
         <SideMenu />
         <main
            style={{
               margin: '80px auto',
               maxWidth: '1440px',
               padding: '0 23px',
            }}
         >
            <Box display="flex" flexDirection="column">
               <Typography variant="h1" component="h1">
                  {icon} {title}
               </Typography>
               <Typography variant="h2" sx={{ mb: 1 }}>
                  {subTitle}
               </Typography>
            </Box>
            <Box className="fadeIn">{children}</Box>
         </main>
      </>
   );
};

export default AdminLayout;
