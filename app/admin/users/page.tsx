import React from 'react';
import DefaultTags from '@/components/tags/default-tags';
import Users from '@/app/admin/users/components/Users';

const UsersPage = () => {
   return (
      <>
         <DefaultTags
            description={'Panel administrativo - usuarios'}
            title={'Teslo-Shop - Admin - users'}
         />
         <Users />
      </>
   );
};

export default UsersPage;
