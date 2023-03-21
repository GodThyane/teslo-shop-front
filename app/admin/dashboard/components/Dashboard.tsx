'use client';

import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import SummaryTile from '@/app/admin/dashboard/components/SummaryTile';
import {
   AccessTimeOutlined,
   AttachMoneyOutlined,
   CancelPresentationOutlined,
   CategoryOutlined,
   CreditCardOffOutlined,
   CreditCardOutlined,
   GroupOutlined,
   ProductionQuantityLimitsOutlined,
} from '@mui/icons-material';
import { useAdmin } from '@/hooks/useProducts';

const Dashboard = () => {
   const { dashboard, isError } = useAdmin('/dashboard', {
      refreshInterval: 30 * 1000,
      revalidateOnFocus: false,
   });

   const [refreshIn, setRefreshIn] = useState(30);

   useEffect(() => {
      const interval = setInterval(() => {
         setRefreshIn((refreshIn) => (refreshIn > 0 ? refreshIn - 1 : 30));
      }, 1000);

      return () => clearInterval(interval);
   }, []);

   if (!isError && !dashboard) return <div>Cargando...</div>;

   if (isError) {
      console.log('Error', isError);
      return <Typography>Error</Typography>;
   }

   const {
      numberOfOrders,
      paidOrders,
      pendingOrders,
      numberOfClients,
      numberOfProducts,
      productsWithNoInventory,
      lowInventory,
   } = dashboard!;

   return (
      <Grid container spacing={2}>
         <SummaryTile
            title={numberOfOrders}
            subtitle="Ordenes totales"
            icon={
               <CreditCardOutlined color="secondary" sx={{ fontSize: 40 }} />
            }
         />

         <SummaryTile
            title={paidOrders}
            subtitle="Ordenes pagadas"
            icon={<AttachMoneyOutlined color="success" sx={{ fontSize: 40 }} />}
         />

         <SummaryTile
            title={pendingOrders}
            subtitle="Ordenes pendientes"
            icon={<CreditCardOffOutlined color="error" sx={{ fontSize: 40 }} />}
         />

         <SummaryTile
            title={numberOfClients}
            subtitle="Clientes"
            icon={<GroupOutlined color="primary" sx={{ fontSize: 40 }} />}
         />

         <SummaryTile
            title={numberOfProducts}
            subtitle="Productos"
            icon={<CategoryOutlined color="warning" sx={{ fontSize: 40 }} />}
         />

         <SummaryTile
            title={productsWithNoInventory}
            subtitle="Sin existencias"
            icon={
               <CancelPresentationOutlined
                  color="error"
                  sx={{ fontSize: 40 }}
               />
            }
         />

         <SummaryTile
            title={lowInventory}
            subtitle="Bajo inventario"
            icon={
               <ProductionQuantityLimitsOutlined
                  color="warning"
                  sx={{ fontSize: 40 }}
               />
            }
         />

         <SummaryTile
            title={refreshIn}
            subtitle="Actualización en:"
            icon={
               <AccessTimeOutlined color="secondary" sx={{ fontSize: 40 }} />
            }
         />
      </Grid>
   );
};

export default Dashboard;
