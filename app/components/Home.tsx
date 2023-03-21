'use client';

import React from 'react';
import { Typography } from '@mui/material';
import ProductList from '@/components/products/ProductList';
import { IProduct } from '@/interfaces';
import { useProducts } from '@/hooks/useProducts';
import FullScreenLoading from '@/components/ui/FullScreenLoading';

interface Props {
   products: IProduct[];
}

const HomePage = (/*{ products }: Props*/) => {
   const { products, isLoading } = useProducts('/products');

   return (
      <>
         <Typography variant="h1">Tienda</Typography>
         <Typography variant="h2" sx={{ mb: 1 }}>
            Todos los productos
         </Typography>

         {isLoading ? (
            <FullScreenLoading />
         ) : (
            <ProductList products={products}></ProductList>
         )}
      </>
   );
};

export default HomePage;
