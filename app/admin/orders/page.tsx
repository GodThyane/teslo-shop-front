import DefaultTags from '@/components/tags/default-tags';
import React from 'react';
import OrdersAdmin from '@/app/admin/orders/components/OrdersAdmin';

const OrdersPage = () => {
   return (
      <>
         <DefaultTags
            description={'Panel administrativo - orders'}
            title={'Teslo-Shop - Admin - Órdenes'}
         />
         <OrdersAdmin />
      </>
   );
};

export default OrdersPage;
