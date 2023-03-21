import { IProduct } from '@/interfaces';

export const fetchSearchProducts = async (
   query: string,
   init: RequestInit = {}
): Promise<IProduct[]> => {
   const base = process.env.BACKEND_URL || '';
   const url = `${base}/search/${query}`;
   const res = await fetch(url, init);
   return await res.json();
};
