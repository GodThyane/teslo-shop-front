import React from 'react';
import Login from '@/app/auth/login/Login';
import DefaultTags from '@/components/tags/default-tags';
import { getProviders } from 'next-auth/react';

const LoginPage = async () => {
   const providers = await getProviders();

   return (
      <>
         <DefaultTags title="Inicio de sesión" description="login page" />
         <Login providers={providers} />
      </>
   );
};

export default LoginPage;
