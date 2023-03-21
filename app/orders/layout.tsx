import React from 'react';

import ShopLayout from '@/components/layouts/ShopLayout';

export default function Layout({ children }: { children: React.ReactNode }) {
   return (
      <>
         <ShopLayout>{children}</ShopLayout>
      </>
   );
}
