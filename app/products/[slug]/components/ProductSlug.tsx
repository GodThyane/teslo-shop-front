'use client';

import React, { useContext, useState } from 'react';
import { ICartProduct, IProduct, ISize } from '@/interfaces';
import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import ProductSlideshow from '@/app/products/[slug]/components/ProductSlideshow';
import ItemCounter from '@/components/ui/ItemCounter';
import ProductSizeSelector from '@/app/products/[slug]/components/ProductSizeSelector';
import { CartContext } from '@/context';
import { useRouter } from 'next/navigation';

const ProductSlug = ({ product }: { product: IProduct }) => {
   const router = useRouter();

   const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
      _id: product._id!,
      image: product.images[0],
      slug: product.slug,
      price: product.price,
      gender: product.gender,
      title: product.title,
      quantity: 1,
   });

   const { addProduct } = useContext(CartContext);

   const handleSizeClick = (size: ISize) => {
      setTempCartProduct((prev) => ({ ...prev, size }));
   };

   const handleCountChange = (count: number) => {
      setTempCartProduct((prev) => ({ ...prev, quantity: count }));
   };

   const handleAddToCart = () => {
      addProduct(tempCartProduct);
      router.push('/cart');
   };

   return (
      <Grid container spacing={3}>
         <Grid item xs={12} sm={7}>
            <ProductSlideshow images={product.images} />
         </Grid>
         <Grid item xs={12} sm={5}>
            <Box display="flex" flexDirection="column">
               {/*Títulos*/}
               <Typography variant="h1" component="h1">
                  {product.title}
               </Typography>
               <Typography variant="subtitle1" component="h2">
                  ${product.price}
               </Typography>

               {/*Cantidad*/}
               <Box sx={{ my: 2 }}>
                  <Typography variant="subtitle2">Cantidad</Typography>
                  <ItemCounter
                     currentCount={tempCartProduct.quantity}
                     maxCount={product.inStock}
                     handleCount={(count) => handleCountChange(count)}
                  />
                  <ProductSizeSelector
                     sizes={product.sizes}
                     selectedSize={tempCartProduct.size}
                     handleSizeClick={(size) => handleSizeClick(size)}
                  />
               </Box>

               {product.inStock > 0 ? (
                  tempCartProduct.size ? (
                     <Button
                        color="secondary"
                        className="circular-btn"
                        onClick={handleAddToCart}
                     >
                        Agregar al carrito
                     </Button>
                  ) : (
                     <Chip
                        label="Selecciona un tamaño"
                        color="secondary"
                        variant="outlined"
                     />
                  )
               ) : (
                  <Chip
                     label="No hay disponibles"
                     color="error"
                     variant="outlined"
                  ></Chip>
               )}

               <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle2">Descripción</Typography>
                  <Typography variant="body2">{product.description}</Typography>
               </Box>
            </Box>
         </Grid>
      </Grid>
   );
};

export default ProductSlug;
