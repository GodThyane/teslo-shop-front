'use client';

import React, { useMemo, useState } from 'react';
import {
   Box,
   Card,
   CardContent,
   Chip,
   CircularProgress,
   Divider,
   Grid,
   Typography,
} from '@mui/material';
import CreditScoreOutlinedIcon from '@mui/icons-material/CreditScoreOutlined';
import CreditCardOffOutlinedIcon from '@mui/icons-material/CreditCardOffOutlined';
import { IOrder } from '@/interfaces/order';
import OrderSummary from '@/components/Cart/OrderSummary';
import { countries } from '@/utils';
import CartList from '@/app/cart/components/CartList';
import { PayPalButtons } from '@paypal/react-paypal-js';
import tesloApi from '@/api/tesloApi';

type OrderResponseBody = {
   id: string;
   status:
      | 'COMPLETED'
      | 'SAVED'
      | 'APPROVED'
      | 'VOIDED'
      | 'PAYER_ACTION_REQUIRED';
};

const Order = ({ order }: { order: IOrder }) => {
   const {
      shippingAddress: {
         address,
         address2,
         city,
         zipCode,
         phone,
         firstName,
         lastName,
         country,
      },
   } = order;

   const addressMemo = useMemo(() => {
      return address2 ? `${address}, ${address2}` : address;
   }, [address2, address]);

   const countryMemo = useMemo(() => {
      return countries.find((c) => c.code === country)?.name;
   }, [country]);
   const [isPaying, setIsPaying] = useState(false);

   const onOrderComplete = async (details: OrderResponseBody) => {
      if (details.status !== 'COMPLETED') {
         return alert('No hay pago en Paypal');
      }

      setIsPaying(true);

      try {
         await tesloApi.post('/orders/pay', {
            orderId: order._id,
            transactionId: details.id,
         });
         location.reload();
      } catch (e) {
         setIsPaying(false);
         console.log(e);
         alert('Error al procesar el pago');
      }
   };

   return (
      <>
         <Typography variant="h1" component="h1">
            Orden: {order._id}
         </Typography>

         {order.isPaid ? (
            <Chip
               sx={{ my: 2 }}
               label="Orden ya fue pagada"
               variant="outlined"
               color="success"
               icon={<CreditScoreOutlinedIcon />}
            />
         ) : (
            <Chip
               sx={{ my: 2 }}
               label="Pendiente de pago"
               variant="outlined"
               color="error"
               icon={<CreditCardOffOutlinedIcon />}
            />
         )}

         <Grid container className="fadeIn">
            <Grid item xs={12} sm={7}>
               <CartList isEditable={false} productsInCart={order.orderItems} />
            </Grid>
            <Grid item xs={12} sm={5}>
               <Card className="summary-card">
                  <CardContent>
                     <Typography variant="h2">
                        Resumen (
                        {order.orderSummary.numberOfItems === 1
                           ? '1 producto'
                           : `${order.orderSummary.numberOfItems} productos`}
                        )
                     </Typography>
                     <Divider sx={{ my: 1 }}></Divider>

                     <Box display="flex" justifyContent="space-between">
                        <Typography variant="subtitle1">
                           Dirección de entrega
                        </Typography>
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

                     <OrderSummary orderSummary={order.orderSummary} />

                     <Box sx={{ mt: 3 }}>
                        <Box
                           display={isPaying ? 'flex' : 'none'}
                           justifyContent="center"
                           className="fadeIn"
                        >
                           <CircularProgress />
                        </Box>
                        <Box display={isPaying ? 'none' : 'block'}>
                           {order.isPaid ? (
                              <Chip
                                 sx={{ my: 2, width: '100%' }}
                                 label="Orden ya fue pagada"
                                 variant="outlined"
                                 color="success"
                                 icon={<CreditScoreOutlinedIcon />}
                              />
                           ) : (
                              <PayPalButtons
                                 createOrder={(data, actions) => {
                                    return actions.order.create({
                                       purchase_units: [
                                          {
                                             amount: {
                                                value: `${order.orderSummary.total}`,
                                             },
                                          },
                                       ],
                                    });
                                 }}
                                 onApprove={(data, actions) => {
                                    return actions.order
                                       ? actions.order
                                            .capture()
                                            .then((details) => {
                                               onOrderComplete(details);
                                            })
                                       : new Promise(() => {});
                                 }}
                              />
                           )}
                        </Box>
                     </Box>
                  </CardContent>
               </Card>
            </Grid>
         </Grid>
      </>
   );
};

export default Order;
