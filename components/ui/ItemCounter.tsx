'use client';

import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

interface Props {
   currentCount: number;
   handleCount: (count: number) => void;
   maxCount: number;
}

const ItemCounter = ({ currentCount, handleCount, maxCount }: Props) => {
   const handleCountChange = (count: number) => {
      if (count === -1) {
         if (currentCount === 1) return;
         return handleCount(currentCount - 1);
      }

      if (currentCount >= maxCount) return;

      return handleCount(currentCount + 1);
   };

   return (
      <Box display="flex" alignItems="center">
         <IconButton
            onClick={() => handleCountChange(-1)}
            disabled={currentCount === 1}
         >
            <RemoveCircleOutlineIcon />
         </IconButton>
         <Typography sx={{ width: 40, textAlign: 'center' }}>
            {maxCount === 0 ? 0 : currentCount}
         </Typography>
         <IconButton
            onClick={() => handleCountChange(+1)}
            disabled={maxCount === currentCount || maxCount === 0}
         >
            <AddCircleOutlineIcon />
         </IconButton>
      </Box>
   );
};

export default ItemCounter;
