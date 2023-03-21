'use client';

import React from 'react';
import { ICartProduct } from '@/interfaces';
import ProductCart from '@/app/cart/components/ProductCart';

interface Props {
   isEditable?: boolean;

   productsInCart: ICartProduct[];

   updateProduct?: (product: ICartProduct) => void;

   removeProduct?: (product: ICartProduct) => void;
}

const CartList = ({
   isEditable = false,
   productsInCart,
   updateProduct,
   removeProduct,
}: Props) => {
   return (
      <>
         {productsInCart.map((product) => (
            <ProductCart
               product={product}
               isEditable={isEditable}
               updateProduct={updateProduct!}
               removeProduct={removeProduct!}
               key={`${product.slug}${product.size}`}
            />
         ))}
      </>
   );
};

export default CartList;
