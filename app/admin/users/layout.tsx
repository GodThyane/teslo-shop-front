'use client';

import React from 'react';

import AdminLayout from '@/components/layouts/AdminLayout';
import { DashboardOutlined } from '@mui/icons-material';

export default function Layout({ children }: { children: React.ReactNode }) {
   return (
      <>
         <AdminLayout
            title="Usuarios"
            subTitle="Mantenimiento de usuarios"
            icon={<DashboardOutlined />}
         >
            {children}
         </AdminLayout>
      </>
   );
}
