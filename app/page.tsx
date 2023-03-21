import './globals.css';
import Home from '@/app/components/Home';
import DefaultTags from '@/components/tags/default-tags';
import React from 'react';
import ShopLayout from '@/components/layouts/ShopLayout';

export default async function HomePage() {
   /*const getProducts = async () => {
      return await fetchProducts();
   };

   const products = await getProducts();*/

   return (
      <>
         <DefaultTags
            description={'Encuentra los mejores productos de Teslo aquí'}
            title={'Teslo-Shop - Home'}
         />
         <ShopLayout>
            <Home />
         </ShopLayout>
      </>
   );
}
