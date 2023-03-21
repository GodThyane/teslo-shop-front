'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import RemoveShoppingCartOutlinedIcon from '@mui/icons-material/RemoveShoppingCartOutlined';
import Link from 'next/link';

const CartEmpty = () => {
   return (
      <Box
         display="flex"
         justifyContent="center"
         alignItems="center"
         height="calc(100vh - 200px)"
         sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
      >
         <RemoveShoppingCartOutlinedIcon sx={{ fontSize: 100 }} />
         <Box display={'flex'} flexDirection="column" alignItems="center">
            <Typography>Su carrito está vacío</Typography>
            <Link href="/" passHref style={{ textDecoration: 'none' }}>
               <Typography variant="h4" color="secondary">
                  Regresar
               </Typography>
            </Link>
         </Box>
      </Box>
   );
};

export default CartEmpty;
