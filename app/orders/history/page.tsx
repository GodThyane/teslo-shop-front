import React from 'react';
import DefaultTags from '@/components/tags/default-tags';
import OrderHistory from '@/app/orders/history/components/OrderHistory';
import { fetchOrders } from '@/app/orders/services/order.service';

const OrderHistoryPage = async () => {
   const getOrders = async () => {
      return await fetchOrders();
   };

   const orders = await getOrders();

   if (!orders) {
      return <h1>Algo salió mal</h1>;
   }

   if (orders.length === 0) {
      return <h1>No hay ordenes</h1>;
   }

   return (
      <>
         <DefaultTags
            description="Historial de ordenes del cliente"
            title="Historial de ordenes"
         />
         <OrderHistory orders={orders} />
      </>
   );
};

export default OrderHistoryPage;
