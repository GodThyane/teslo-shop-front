'use client';

import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { lightTheme } from '@/themes';

const ThemeProviderCustom = ({ children }: { children: React.ReactNode }) => {
   return (
      <ThemeProvider theme={lightTheme}>
         <CssBaseline />
         {children}
      </ThemeProvider>
   );
};

export default ThemeProviderCustom;
