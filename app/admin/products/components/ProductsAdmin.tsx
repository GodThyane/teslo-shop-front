'use client';

import React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Box, Button, CardMedia, Grid } from '@mui/material';
import { useProductsAdmin } from '@/hooks/useProducts';
import AdminLayout from '@/components/layouts/AdminLayout';
import { AddOutlined, CategoryOutlined } from '@mui/icons-material';
import { format } from '@/utils';
import Link from 'next/link';

const columns: GridColDef[] = [
   {
      field: 'img',
      headerName: 'Foto',
      // @ts-ignore
      renderCell: ({ row }: GridValueGetterParams) => {
         return (
            <a href={`/products/${row.slug}`} target="_blank" rel="noreferrer">
               <CardMedia
                  component="img"
                  alt={row.title}
                  className="fadeIn"
                  image={row.img}
               />
            </a>
         );
      },
   },
   {
      field: 'title',
      headerName: 'Título',
      width: 250,
      // @ts-ignore
      renderCell: ({ row }: GridValueGetterParams) => {
         return <Link href={`/admin/products/${row.slug}`}>{row.title}</Link>;
      },
   },
   { field: 'gender', headerName: 'Género' },
   { field: 'type', headerName: 'Tipo' },
   { field: 'inStock', headerName: 'Inventario' },
   { field: 'price', headerName: 'Precio' },
   { field: 'sizes', headerName: 'Tallas', width: 250 },
];

const ProductsAdmin = () => {
   const { products, isError } = useProductsAdmin();

   if (!products && !isError) return <h1>Loading...</h1>;

   const rows = products.map((product) => ({
      id: product._id,
      img: product.images[0],
      title: product.title,
      gender: product.gender,
      type: product.type,
      inStock: product.inStock,
      price: format(product.price),
      sizes: product.sizes.join(', '),
      slug: product.slug,
   }));

   return (
      <AdminLayout
         title="Productos"
         subTitle="Mantenimiento de productos"
         icon={<CategoryOutlined />}
      >
         <Box display="flex" justifyContent="end" sx={{ mb: 2 }}>
            <Button
               startIcon={<AddOutlined />}
               color="secondary"
               href="/admin/products/new"
            >
               Crear producto
            </Button>
         </Box>
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

export default ProductsAdmin;
