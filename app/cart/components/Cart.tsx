'use client';

import React, { useContext, useEffect } from 'react';
import {
   Box,
   Button,
   Card,
   CardContent,
   Divider,
   Grid,
   Typography,
} from '@mui/material';
import CartList from '@/app/cart/components/CartList';
import OrderSummary from '@/components/Cart/OrderSummary';
import Link from 'next/link';
import { CartContext } from '@/context';
import { redirect } from 'next/navigation';
import { ICartProduct } from '@/interfaces';

const Cart = () => {
   const {
      cart,
      updateProduct,
      removeProduct,
      isLoadingFromCookies,
      orderSummary,
   } = useContext(CartContext);

   const handleUpdateProduct = (product: ICartProduct) => {
      updateProduct(product);
   };

   const handleRemoveProduct = (product: ICartProduct) => {
      removeProduct(product);
   };

   useEffect(() => {
      if (cart.length === 0 && !isLoadingFromCookies) redirect('/cart/empty');
   }, [cart, isLoadingFromCookies]);

   if (isLoadingFromCookies || cart.length === 0) return <></>;

   return (
      <>
         <Typography variant="h1" component="h1">
            Carrito
         </Typography>
         <Grid container>
            <Grid item xs={12} sm={7}>
               <CartList
                  isEditable={true}
                  productsInCart={cart}
                  updateProduct={handleUpdateProduct}
                  removeProduct={handleRemoveProduct}
               />
            </Grid>
            <Grid item xs={12} sm={5}>
               <Card className="summary-card">
                  <CardContent>
                     <Typography variant="h2">Orden</Typography>
                     <Divider sx={{ my: 1 }}></Divider>

                     {/*Order sumary*/}

                     <OrderSummary orderSummary={orderSummary} />

                     <Box sx={{ mt: 3 }}>
                        <Link
                           href="/checkout/address"
                           passHref
                           style={{ textDecoration: 'none' }}
                           prefetch={false}
                        >
                           <Button
                              color="secondary"
                              className="circular-btn"
                              fullWidth
                           >
                              Checkout
                           </Button>
                        </Link>
                     </Box>
                  </CardContent>
               </Card>
            </Grid>
         </Grid>
      </>
   );
};

export default Cart;
