'use client';

import React from 'react';
import { Chip, Grid } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useOrders } from '@/hooks/useProducts';
import { IUser } from '@/interfaces/user';
import { ConfirmationNumberOutlined } from '@mui/icons-material';
import AdminLayout from '@/components/layouts/AdminLayout';
import { format, formatDate } from '@/utils';

const columns: GridColDef[] = [
   { field: 'id', headerName: 'Orden ID', width: 250 },
   { field: 'email', headerName: 'Correo', width: 250 },
   { field: 'name', headerName: 'Nombre Completo', width: 300 },
   { field: 'total', headerName: 'Monto total', width: 300 },
   {
      field: 'isPaid',
      headerName: 'Pagado',
      width: 150,
      // @ts-ignore
      renderCell: ({ row }: GridValueGetterParams) => {
         return row.isPaid ? (
            <Chip
               variant="outlined"
               label="Pagada"
               color="success"
               sx={{ width: '100%' }}
            />
         ) : (
            <Chip
               variant="outlined"
               label="Pendiente"
               color="error"
               sx={{ width: '100%' }}
            />
         );
      },
   },
   {
      field: 'nProducts',
      headerName: 'No. Productos',
      align: 'center',
      width: 130,
   },
   {
      field: 'check',
      headerName: 'Ver orden',
      // @ts-ignore
      renderCell: ({ row }: GridValueGetterParams) => {
         return (
            <a
               href={`/admin/orders/${row.id}`}
               target="_blank"
               rel="noreferrer"
            >
               Ver orden
            </a>
         );
      },
   },
   { field: 'createdAt', headerName: 'Creada en', width: 300 },
];

const OrdersAdmin = () => {
   const { orders, isError } = useOrders('/orders');

   if (!orders && !isError) return <h1>Loading...</h1>;

   const rows = orders.map((order) => ({
      id: order._id,
      email: (order.user as IUser).email,
      name: (order.user as IUser).name,
      total: format(order.orderSummary.total),
      isPaid: order.isPaid,
      nProducts: order.orderSummary.numberOfItems,
      createdAt: formatDate(order.createdAt),
   }));

   return (
      <AdminLayout
         title="Órdenes"
         subTitle="Mantenimiento de órdenes"
         icon={<ConfirmationNumberOutlined />}
      >
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
      </AdminLayout>
   );
};

export default OrdersAdmin;
