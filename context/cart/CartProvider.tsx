'use client';

import React, { useReducer, useMemo, useEffect } from 'react';
import { CartContext, cartReducer } from './';
import { ICartProduct } from '@/interfaces';
import Cookie from 'js-cookie';
import { tesloApiInto } from '@/api/tesloApi';
import { CreateOrder } from '@/interfaces/order';
import process from 'process';
import axios from 'axios';

export interface CartState {
   cart: ICartProduct[];
   isLoadingFromCookies: boolean;
   isLoadingShippingAddressFromCookies: boolean;

   shippingAddress?: ShippingAddress;

   orderSummary: {
      numberOfItems: number;
      subTotal: number;
      tax: number;
      total: number;
   };
}

export interface ShippingAddress {
   firstName: string;
   lastName: string;
   address: string;
   address2?: string;
   zipCode: string;
   city: string;
   country: string;
   phone: string;
}

const Cart_INITIAL_STATE: CartState = {
   cart: [],
   isLoadingFromCookies: true,
   isLoadingShippingAddressFromCookies: true,
   shippingAddress: undefined,
   orderSummary: {
      numberOfItems: 0,
      subTotal: 0,
      tax: 0,
      total: 0,
   },
};

interface Props {
   children: React.ReactNode;
}

const CartProvider = ({ children }: Props) => {
   const [state, dispatch] = useReducer(cartReducer, Cart_INITIAL_STATE);

   useEffect(() => {
      getCartFromCookie();
   }, []);

   useEffect(() => {
      getShippingAddressFromCookie();
   }, []);

   const getShippingAddressFromCookie = () => {
      try {
         const shippingAddress = Cookie.get('shippingAddress')
            ? JSON.parse(Cookie.get('shippingAddress')!)
            : undefined;
         dispatch({
            type: 'Shipping - Load Shipping Address from cookies | storage',
            payload: shippingAddress,
         });
      } catch (error) {
         dispatch({
            type: 'Shipping - Load Shipping Address from cookies | storage',
            payload: undefined,
         });
      }
   };

   const getCartFromCookie = () => {
      try {
         const cart = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : [];
         dispatch({
            type: 'Cart - LoadCart from cookies | storage',
            payload: cart,
         });
      } catch (error) {
         dispatch({
            type: 'Cart - LoadCart from cookies | storage',
            payload: [],
         });
      }
   };

   useEffect(() => {
      Cookie.set('cart', JSON.stringify(state.cart));
   }, [state.cart]);

   useEffect(() => {
      Cookie.set('shippingAddress', JSON.stringify(state.shippingAddress));
   }, [state.shippingAddress]);

   useEffect(() => {
      const numberOfItems = state.cart.reduce(
         (prev, current) => current.quantity + prev,
         0
      );
      const subTotal = state.cart.reduce(
         (prev, current) => current.quantity * current.price + prev,
         0
      );

      const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE);

      const orderSummary = {
         numberOfItems,
         subTotal,
         tax: subTotal * taxRate,
         total: subTotal + subTotal * taxRate,
      };

      dispatch({
         type: 'Cart - Update order summary',
         payload: orderSummary,
      });
   }, [state.cart]);

   const addProduct = (product: ICartProduct) => {
      const productInCart = state.cart.some(
         (c) => c.slug === product.slug && c.size === product.size
      );
      if (!productInCart)
         return dispatch({
            type: 'Cart - Update products in cart',
            payload: [...state.cart, product],
         });

      const updatedCart = state.cart.map((c) => {
         if (c.slug === product.slug && c.size === product.size) {
            return {
               ...c,
               quantity: c.quantity + product.quantity,
            };
         }
         return c;
      });

      dispatch({
         type: 'Cart - Update products in cart',
         payload: updatedCart,
      });
   };

   const updateProduct = (product: ICartProduct) => {
      const updatedCart = state.cart.map((c) => {
         if (c.slug === product.slug && c.size === product.size) {
            return {
               ...c,
               quantity: product.quantity,
            };
         }
         return c;
      });

      dispatch({
         type: 'Cart - Update products in cart',
         payload: updatedCart,
      });
   };

   const removeProduct = (product: ICartProduct) => {
      dispatch({
         type: 'Cart - Remove Product',
         payload: product,
      });
   };

   const setShippingAddress = (shippingAddress: ShippingAddress) => {
      dispatch({
         type: 'Shipping - Set Shipping Address',
         payload: shippingAddress,
      });
   };

   const createOrder = async (): Promise<{
      hasError: boolean;
      message: string;
   }> => {
      if (!state.shippingAddress) throw new Error('No shipping address');
      if (state.cart.length === 0) throw new Error('No products in cart');

      const body: CreateOrder = {
         orderItems: state.cart.map((c) => ({
            ...c,
            size: c.size!,
         })),
         shippingAddress: state.shippingAddress,
         orderSummary: state.orderSummary,
         isPaid: false,
      };

      try {
         const { data } = await tesloApiInto.post('/orders', body);

         dispatch({ type: 'Order - Order created' });
         return {
            hasError: false,
            message: data.orderId,
         };
      } catch (error) {
         if (axios.isAxiosError(error)) {
            const { response } = error as any;
            const message =
               response?.data?.message || 'Error al crear la orden';
            return {
               hasError: true,
               message,
            };
         }
         return {
            hasError: true,
            message: 'Error al crear la orden',
         };
      }
   };

   const CartMemo = useMemo(
      () => ({
         ...state,

         // Methods
         addProduct,
         updateProduct,
         removeProduct,
         setShippingAddress,
         createOrder,
      }),
      [state]
   );

   return (
      <CartContext.Provider value={CartMemo}>{children}</CartContext.Provider>
   );
};
export default CartProvider;
