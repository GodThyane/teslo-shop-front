import { createContext } from 'react';
import { ICartProduct } from '@/interfaces';
import { ShippingAddress } from '@/context';

interface ContextProps {
   cart: ICartProduct[];
   orderSummary: {
      numberOfItems: number;
      subTotal: number;
      tax: number;
      total: number;
   };

   shippingAddress?: ShippingAddress;

   //Methods
   isLoadingFromCookies: boolean;
   isLoadingShippingAddressFromCookies: boolean;
   addProduct: (product: ICartProduct) => void;
   updateProduct: (product: ICartProduct) => void;
   removeProduct: (product: ICartProduct) => void;

   setShippingAddress: (shippingAddress: ShippingAddress) => void;

   createOrder: () => Promise<{ hasError: boolean; message: string }>;
}

export const CartContext = createContext({} as ContextProps);
