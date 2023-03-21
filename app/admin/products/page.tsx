import DefaultTags from '@/components/tags/default-tags';
import React from 'react';
import ProductsAdmin from '@/app/admin/products/components/ProductsAdmin';

const ProductsPage = () => {
   return (
      <>
         <DefaultTags
            description={'Panel administrativo - productos'}
            title={'Teslo-Shop - Admin - Products'}
         />
         <ProductsAdmin />
      </>
   );
};

export default ProductsPage;
