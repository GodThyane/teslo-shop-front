'use client';

import React from 'react';
import { ISize } from '@/interfaces';
import { Box, Button } from '@mui/material';

interface Props {
   selectedSize?: ISize;
   sizes: ISize[];

   handleSizeClick: (size: ISize) => void;
}

const ProductSizeSelector = ({
   selectedSize,
   sizes,
   handleSizeClick,
}: Props) => {
   return (
      <Box>
         {sizes.map((size) => (
            <Button
               key={size}
               size="small"
               color={selectedSize === size ? 'primary' : 'info'}
               onClick={() => handleSizeClick(size)}
               sx={{
                  ':hover': {
                     color: 'primary.main',
                  },
               }}
            >
               {size}
            </Button>
         ))}
      </Box>
   );
};

export default ProductSizeSelector;
