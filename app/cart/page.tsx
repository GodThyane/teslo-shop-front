import React from 'react';
import DefaultTags from '@/components/tags/default-tags';
import Cart from '@/app/cart/components/Cart';

const CartPage = () => {
   return (
      <>
         <DefaultTags
            description="Carrito de compras de la tienda"
            title="Carrito - 3"
         />
         <Cart />
      </>
   );
};

export default CartPage;
