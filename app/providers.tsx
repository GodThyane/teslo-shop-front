'use client';

import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import React from 'react';
import ThemeProviderCustom from '@/app/theme-provider-custom';
import { SWRConfig } from 'swr';
import UIProvider from '@/context/ui/UIProvider';
import CartProvider from '@/context/cart/CartProvider';
import AuthProvider from '@/context/auth/AuthProvider';
import { SessionProvider } from 'next-auth/react';

const Providers = ({ children }: { children: React.ReactNode }) => {
   return (
      <SessionProvider>
         <PayPalScriptProvider
            options={{
               'client-id': process.env.NEXT_PUBLIC_PAYPAL_CLIENT || '',
            }}
         >
            <SWRConfig
               value={{
                  fetcher: (resource, init) =>
                     fetch(resource, init).then((res) => res.json()),
               }}
            >
               <AuthProvider>
                  <CartProvider>
                     <UIProvider>
                        <ThemeProviderCustom>{children}</ThemeProviderCustom>
                     </UIProvider>
                  </CartProvider>
               </AuthProvider>
            </SWRConfig>
         </PayPalScriptProvider>
      </SessionProvider>
   );
};

export default Providers;
