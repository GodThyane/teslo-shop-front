'use client';

import { Grid, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import * as process from 'process';
import { format } from '@/utils';

interface Props {
   orderSummary: {
      numberOfItems: number;
      subTotal: number;
      tax: number;
      total: number;
   };
}

const taxRate = process.env.NEXT_PUBLIC_TAX_RATE;

const OrderSummary = ({
   orderSummary: { numberOfItems, tax, total, subTotal },
}: Props) => {
   const taxRatePercent = useMemo(() => {
      return Number(taxRate) * 100;
   }, []);

   return (
      <Grid container>
         <Grid item xs={6}>
            <Typography>No. Productos</Typography>
         </Grid>
         <Grid item xs={6} display="flex" justifyContent="end">
            <Typography>{numberOfItems} productos</Typography>
         </Grid>

         <Grid item xs={6}>
            <Typography>SubTotal</Typography>
         </Grid>
         <Grid item xs={6} display="flex" justifyContent="end">
            <Typography>{format(subTotal)}</Typography>
         </Grid>

         <Grid item xs={6}>
            <Typography>Impuestos ({taxRatePercent}%)</Typography>
         </Grid>
         <Grid item xs={6} display="flex" justifyContent="end">
            <Typography>{format(tax)}</Typography>
         </Grid>

         <Grid item xs={6} sx={{ mt: 2 }}>
            <Typography variant="subtitle1">Total</Typography>
         </Grid>
         <Grid item xs={6} sx={{ mt: 2 }} display="flex" justifyContent="end">
            <Typography variant="subtitle1">{format(total)}</Typography>
         </Grid>
      </Grid>
   );
};

export default OrderSummary;
