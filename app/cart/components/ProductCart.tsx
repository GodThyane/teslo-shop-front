'use client';

import React from 'react';
import {
   Box,
   Button,
   CardActionArea,
   CardMedia,
   Grid,
   Typography,
} from '@mui/material';
import Link from 'next/link';
import ItemCounter from '@/components/ui/ItemCounter';
import { ICartProduct } from '@/interfaces';

interface Props {
   product: ICartProduct;
   isEditable?: boolean;
   updateProduct: (product: ICartProduct) => void;

   removeProduct: (product: ICartProduct) => void;
}

const ProductCart = ({
   product,
   isEditable,
   updateProduct,
   removeProduct,
}: Props) => {
   const updateCount = (count: number) => {
      product.quantity = count;
      updateProduct(product);
   };

   const handleRemoveProduct = () => {
      removeProduct(product);
   };

   return (
      <Grid
         container
         spacing={2}
         key={`${product.slug}${product.size}`}
         sx={{ mb: 1 }}
      >
         <Grid item xs={3}>
            <Link href={`/products/${product.slug}`} passHref>
               <CardActionArea>
                  <CardMedia
                     image={product.image}
                     component="img"
                     sx={{ borderRadius: '5px' }}
                  />
               </CardActionArea>
            </Link>
         </Grid>
         <Grid item xs={7}>
            <Box display="flex" flexDirection="column">
               <Typography variant="body1">{product.title}</Typography>
               <Typography variant="body1">
                  Talla: <strong>{product.size}</strong>
               </Typography>
               {isEditable ? (
                  <ItemCounter
                     currentCount={product.quantity}
                     maxCount={10}
                     handleCount={(count) => updateCount(count)}
                  />
               ) : (
                  <Typography variant="h6">
                     {product.quantity}{' '}
                     {product.quantity > 1 ? 'productos' : 'producto'}
                  </Typography>
               )}
            </Box>
         </Grid>
         <Grid
            item
            xs={2}
            display="flex"
            alignItems="center"
            flexDirection="column"
         >
            <Typography variant="subtitle1">${product.price}</Typography>
            {isEditable && (
               <Button
                  variant="text"
                  color="secondary"
                  onClick={handleRemoveProduct}
               >
                  Eliminar
               </Button>
            )}
         </Grid>
      </Grid>
   );
};

export default ProductCart;
