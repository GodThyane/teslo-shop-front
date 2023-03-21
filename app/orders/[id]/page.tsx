import React from 'react';
import DefaultTags from '@/components/tags/default-tags';
import Order from '@/app/orders/[id]/components/Order';
import { fetchOrder } from '@/app/orders/services/order.service';

interface Props {
   id: string;
}

const OrderPage = async ({ params: { id } }: { params: Props }) => {
   const getOrder = async () => {
      return await fetchOrder(id);
   };

   const order = await getOrder();

   return (
      <>
         <DefaultTags
            description={`Resumen de la orden #${id}`}
            title={`Resumen de la orden #${id}`}
         />
         <Order order={order} />
      </>
   );
};

export default OrderPage;
