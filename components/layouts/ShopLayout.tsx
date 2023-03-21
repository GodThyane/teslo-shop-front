import React from 'react';
import Navbar from '@/components/ui/Navbar';
import SideMenu from '@/components/ui/SideMenu';

const ShopLayout = ({ children }: { children: React.ReactNode }) => {
   return (
      <>
         <Navbar />
         <SideMenu />
         <main
            style={{
               margin: '80px auto',
               maxWidth: '1440px',
               padding: '0 23px',
            }}
         >
            {children}
         </main>
         <footer>{/*TODO*/}</footer>
      </>
   );
};

export default ShopLayout;
