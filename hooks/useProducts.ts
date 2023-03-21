import useSWR, { SWRConfiguration } from 'swr';
import { IProduct } from '@/interfaces';
import { IDashboard } from '@/interfaces/dashboard';
import { IUser } from '@/interfaces/user';
import { IOrder } from '@/interfaces/order';
import process from 'process';

/*const fetcher = (...args: [key: string]) =>
   fetch(...args).then((res) => res.json());*/

export const useProducts = (url: string, config: SWRConfiguration = {}) => {
   /*const { data, error } = useSWR<IProduct[]>(
      `http://localhost:3001/api${url}`,
      fetcher,
      config
   );*/
   const base = process.env.NEXT_PUBLIC_BACKEND_URL || '';
   const { data, error } = useSWR<IProduct[]>(`${base}${url}`, config);

   return {
      products: data || [],
      isLoading: !error && !data,
      isError: error,
   };
};

export const useAdmin = (url: string, config: SWRConfiguration = {}) => {
   const base = process.env.NEXT_PUBLIC_BACKEND_URL || '';
   const { data, error } = useSWR<IDashboard>(`${base}/admin${url}`, config);

   return {
      dashboard: data || undefined,
      isLoading: !error && !data,
      isError: error,
   };
};

export const useUsers = (url: string, config: SWRConfiguration = {}) => {
   const base = process.env.NEXT_PUBLIC_BACKEND_URL || '';
   const { data, error } = useSWR<IUser[]>(`${base}/admin${url}`, config);

   return {
      users: data || [],
      isLoading: !error && !data,
      isError: error,
   };
};

export const useOrders = (url: string, config: SWRConfiguration = {}) => {
   const base = process.env.NEXT_PUBLIC_BACKEND_URL || '';
   const { data, error } = useSWR<IOrder[]>(`${base}/admin${url}`, config);

   return {
      orders: data || [],
      isLoading: !error && !data,
      isError: error,
   };
};

export const useProductsAdmin = (config: SWRConfiguration = {}) => {
   const base = process.env.NEXT_PUBLIC_BACKEND_URL || '';
   const { data, error } = useSWR<IProduct[]>(`${base}/admin/products`, config);

   return {
      products: data || [],
      isLoading: !error && !data,
      isError: error,
   };
};
