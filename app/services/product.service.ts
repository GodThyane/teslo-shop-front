import { IProduct } from '@/interfaces';

export const fetchProducts = async (
   init: RequestInit = {}
): Promise<IProduct[]> => {
   const base = process.env.BACKEND_URL || '';
   const url = `${base}/products`;
   const res = await fetch(url, init);
   return await res.json();
};

export const fetchProduct = async (
   slug: string,
   init: RequestInit = {}
): Promise<IProduct | null> => {
   const base = process.env.BACKEND_URL || '';
   const url = `${base}/products/${slug}`;
   const res = await fetch(url, init);
   if (res.status === 404) {
      return null;
   }
   return await res.json();
};
