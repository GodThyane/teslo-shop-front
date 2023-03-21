'use client';

import React, { useContext, useEffect, useMemo, useState } from 'react';
import {
   Box,
   Button,
   Card,
   CardContent,
   Chip,
   Divider,
   Grid,
   Typography,
} from '@mui/material';
import OrderSummary from '@/components/Cart/OrderSummary';
import Link from 'next/link';
import CartList from '@/app/cart/components/CartList';
import { CartContext } from '@/context';
import { countries } from '@/utils';
import { useRouter } from 'next/navigation';

const Summary = () => {
   const {
      cart,
      orderSummary,
      shippingAddress,
      isLoadingShippingAddressFromCookies,
      isLoadingFromCookies,
      createOrder,
   } = useContext(CartContext);
   const router = useRouter();

   const [isPosting, setIsPosting] = useState(false);
   const [errorMessage, setErrorMessage] = useState('');

   useEffect(() => {
      if (cart.length === 0 && !isLoadingFromCookies && !isPosting)
         router.push('/cart/empty');
   }, [cart, isLoadingFromCookies, router]);

   useEffect(() => {
      if (
         !shippingAddress &&
         !isLoadingShippingAddressFromCookies &&
         cart.length > 0
      )
         router.push('/checkout/address');
   }, [
      shippingAddress,
      isLoadingShippingAddressFromCookies,
      router,
      cart.length,
   ]);

   const addressMemo = useMemo(() => {
      if (!shippingAddress) return;
      const { address, address2 } = shippingAddress;
      return address2 ? `${address}, ${address2}` : address;
   }, [shippingAddress]);

   const countryMemo = useMemo(() => {
      if (!shippingAddress) return;
      const { country } = shippingAddress;
      return countries.find((c) => c.code === country)?.name;
   }, [shippingAddress]);

   if (
      !shippingAddress ||
      isLoadingShippingAddressFromCookies ||
      isLoadingFromCookies ||
      cart.length === 0
   )
      return <></>;

   const { firstName, lastName, city, phone, zipCode } = shippingAddress;

   const onCreateOrder = async () => {
      setIsPosting(true);
      const res = await createOrder();
      if (res.hasError) {
         setIsPosting(false);
         setErrorMessage(res.message);
         return;
      }
      router.replace(`/orders/${res.message}`);
   };

   return (
      <>
         <Typography variant="h1" component="h1">
            Resumen de la orden
         </Typography>
         <Grid container>
            <Grid item xs={12} sm={7}>
               <CartList productsInCart={cart} />
            </Grid>
            <Grid item xs={12} sm={5}>
               <Card className="summary-card">
                  <CardContent>
                     <Typography variant="h2">
                        Resumen (
                        {orderSummary.numberOfItems === 1
                           ? '1 producto'
                           : `${orderSummary.numberOfItems} productos`}
                        )
                     </Typography>
                     <Divider sx={{ my: 1 }}></Divider>

                     <Box display="flex" justifyContent="space-between">
                        <Typography variant="subtitle1">
                           Dirección de entrega
                        </Typography>
                        <Link href="/checkout/address" passHref>
                           Editar
                        </Link>
                     </Box>
                     <Typography>
                        {firstName} {lastName}
                     </Typography>
                     <Typography>{addressMemo}</Typography>
                     <Typography>
                        {city}, {zipCode}
                     </Typography>
                     <Typography>{countryMemo}</Typography>
                     <Typography>{phone}</Typography>

                     <Divider sx={{ my: 1 }}></Divider>

                     {/*Order sumary*/}

                     <Box display="flex" justifyContent="end">
                        <Link href="/cart" passHref>
                           Editar
                        </Link>
                     </Box>

                     <OrderSummary orderSummary={orderSummary} />

                     <Box sx={{ mt: 3 }} display="flex" flexDirection="column">
                        <Button
                           color="secondary"
                           className="circular-btn"
                           fullWidth
                           onClick={onCreateOrder}
                           disabled={isPosting}
                        >
                           Confirmar orden
                        </Button>
                        {errorMessage && (
                           <Chip
                              label={errorMessage}
                              color="error"
                              sx={{ mt: 1 }}
                           />
                        )}
                     </Box>
                  </CardContent>
               </Card>
            </Grid>
         </Grid>
      </>
   );
};

export default Summary;
