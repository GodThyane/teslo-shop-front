import React from 'react';

import './globals.css';
import Providers from '@/app/providers';

export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <html lang="en">
         <head />
         <body>
            <Providers>{children}</Providers>
         </body>
      </html>
   );
}
