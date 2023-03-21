import React from 'react';
import DefaultTags from '@/components/tags/default-tags';
import Address from '@/app/checkout/address/components/Address';

const AddressPage = async () => {
   /*const cookieStore = cookies();
   const token = cookieStore.get('token')?.value || '';
   let userId = '';
   let isValidToken = false;

   const validateToken = async () => {
      try {
         userId = await verifyToken(token);
         isValidToken = true;
      } catch (e) {
         isValidToken = false;
      }
      if (!isValidToken) {
         redirect('/auth/login?p=/checkout/address');
      }
   };

   await validateToken();*/

   return (
      <>
         <DefaultTags
            description={'Confirmar dirección del destino'}
            title={'Dirección'}
         />
         <Address />
      </>
   );
};

export default AddressPage;
