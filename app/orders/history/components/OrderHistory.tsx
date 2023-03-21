'use client';
import React from 'react';
import { Chip, Grid, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import Link from 'next/link';
import { IOrder } from '@/interfaces/order';

const columns: GridColDef[] = [
   { field: 'id', headerName: 'ID', width: 100 },
   { field: 'fullName', headerName: 'Nombre Completo', width: 300 },
   {
      field: 'paid',
      headerName: 'Pagada',
      description: 'Muestra información si está pagada la orden o no',
      width: 150,
      // @ts-ignore
      renderCell: (params: GridValueGetterParams) => {
         return params.row.paid ? (
            <Chip
               color="success"
               label="Pagada"
               variant="outlined"
               sx={{ width: '100%' }}
            />
         ) : (
            <Chip
               color="error"
               label="No pagada"
               variant="outlined"
               sx={{ width: '100%' }}
            />
         );
      },
   },
   {
      field: 'order',
      headerName: 'Orden',
      description: 'Redirige a la orden',
      sortable: false,
      width: 150,
      // @ts-ignore
      renderCell: (params: GridValueGetterParams) => {
         return (
            <Link
               href={`/orders/${params.row._id}`}
               style={{ color: 'black' }}
               passHref
            >
               Ver orden
            </Link>
         );
      },
   },
];

const OrderHistory = ({ orders }: { orders: IOrder[] }) => {
   const rows = orders.map((order, index) => ({
      id: index + 1,
      paid: order.isPaid,
      fullName: `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`,
      _id: order._id,
   }));
   return (
      <>
         <Typography variant="h1" component="h1">
            Historial de órdenes
         </Typography>
         <Grid className="fadeIn">
            <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
               <DataGrid
                  columns={columns}
                  rows={rows}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
               />
            </Grid>
         </Grid>
      </>
   );
};

export default OrderHistory;
