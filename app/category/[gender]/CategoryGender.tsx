'use client';

import React from 'react';
import { useProducts } from '@/hooks/useProducts';
import { Typography } from '@mui/material';
import FullScreenLoading from '@/components/ui/FullScreenLoading';
import ProductList from '@/components/products/ProductList';

interface Props {
   gender: string;
   genderName: string;
}

const CategoryGender = ({ gender, genderName }: Props) => {
   const { products, isLoading } = useProducts(`/products?gender=${gender}`);

   return (
      <>
         <Typography variant="h1">{genderName}</Typography>
         <Typography variant="h2" sx={{ mb: 1 }}>
            Productos para {genderName.toLowerCase()}
         </Typography>

         {isLoading ? (
            <FullScreenLoading />
         ) : (
            <ProductList products={products}></ProductList>
         )}
      </>
   );
};
export default CategoryGender;
