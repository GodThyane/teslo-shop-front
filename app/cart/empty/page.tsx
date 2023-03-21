import React from 'react';
import CartEmpty from '@/app/cart/empty/components/CartEmpty';
import DefaultTags from '@/components/tags/default-tags';

const EmptyPage = () => {
   return (
      <>
         <DefaultTags
            description="No hay productos en el carrito de compras"
            title="Carrito vacío"
         />
         <CartEmpty />;
      </>
   );
};

export default EmptyPage;
