import React from 'react';
import DefaultTags from '@/components/tags/default-tags';
import { fetchOrder } from '@/app/orders/services/order.service';
import OrderAdmin from '@/app/admin/orders/[id]/components/OrderAdmin';

interface Props {
   id: string;
}

const OrderAdminPage = async ({ params: { id } }: { params: Props }) => {
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
         <OrderAdmin order={order} />
      </>
   );
};

export default OrderAdminPage;
