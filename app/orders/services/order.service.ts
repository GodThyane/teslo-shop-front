import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { generateToken } from '@/utils';
import { IOrder } from '@/interfaces/order';

export const fetchOrder = async (id: string) => {
   const base = process.env.BACKEND_URL || '';
   const res = await fetch(`${base}/orders/${id}`, {
      cache: 'no-store',
   });
   if (!res.ok) {
      return null;
   }
   return await res.json();
};

export const fetchOrders = async (): Promise<IOrder[] | null> => {
   const session = await getServerSession(authOptions);
   const {
      user: { _id, email },
   } = session as any;
   const token = generateToken(_id, email);
   const base = process.env.BACKEND_URL || '';
   const response = await fetch(`${base}/orders`, {
      headers: {
         'Content-Type': 'application/json',
         Authorization: `Bearer ${token}`,
      },
   });

   if (!response.ok) {
      return null;
   }

   return await response.json();
};
