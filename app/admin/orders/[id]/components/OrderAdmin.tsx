'use client';

import React, { useMemo } from 'react';
import {
   Box,
   Card,
   CardContent,
   Chip,
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
import { AirplaneTicketOutlined } from '@mui/icons-material';
import AdminLayout from '@/components/layouts/AdminLayout';

const OrderAdmin = ({ order }: { order: IOrder }) => {
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

   return (
      <AdminLayout
         title="Resumen de la orden"
         subTitle={`Orden #${order._id}`}
         icon={<AirplaneTicketOutlined />}
      >
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
                  </CardContent>
               </Card>
            </Grid>
         </Grid>
      </AdminLayout>
   );
};

export default OrderAdmin;
