'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import ProductList from '@/components/products/ProductList';
import { IProduct } from '@/interfaces';

interface Props {
   products: IProduct[];
   search: string;
   foundProducts: boolean;
}

const SearchQuery = ({ products, search, foundProducts }: Props) => {
   return (
      <>
         <Typography variant="h1">Buscar producto</Typography>

         {foundProducts ? (
            <Typography variant="h2" sx={{ mb: 1 }} textTransform="capitalize">
               Búsqueda: {search}
            </Typography>
         ) : (
            <Box display="flex">
               <Typography variant="h2" sx={{ mb: 1 }}>
                  No encontramos ningún producto
               </Typography>
               <Typography
                  variant="h2"
                  sx={{ ml: 1 }}
                  color="secondary"
                  textTransform="capitalize"
               >
                  {search}
               </Typography>
            </Box>
         )}

         <ProductList products={products} />
      </>
   );
};

export default SearchQuery;
