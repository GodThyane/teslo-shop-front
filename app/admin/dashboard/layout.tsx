'use client';

import React from 'react';

import AdminLayout from '@/components/layouts/AdminLayout';
import { DashboardOutlined } from '@mui/icons-material';

export default function Layout({ children }: { children: React.ReactNode }) {
   return (
      <>
         <AdminLayout
            title="Dashboard"
            subTitle="Estadísticas generales"
            icon={<DashboardOutlined />}
         >
            {children}
         </AdminLayout>
      </>
   );
}
