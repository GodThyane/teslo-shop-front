import React from 'react';
import Dashboard from '@/app/admin/dashboard/components/Dashboard';
import DefaultTags from '@/components/tags/default-tags';

const DashboardPage = () => {
   return (
      <>
         <DefaultTags
            description={'Panel administrativo'}
            title={'Teslo-Shop - Admin'}
         />
         <Dashboard />
      </>
   );
};

export default DashboardPage;
