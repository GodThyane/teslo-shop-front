import React from 'react';
import DefaultTags from '@/components/tags/default-tags';
import Register from './Register';

const LoginPage = () => {
   return (
      <>
         <DefaultTags title="Registro de usuario" description="Register page" />
         <Register />
      </>
   );
};

export default LoginPage;
