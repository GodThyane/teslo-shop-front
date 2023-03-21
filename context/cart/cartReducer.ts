import { CartState, ShippingAddress } from './';
import { ICartProduct } from '@/interfaces';

type CartActionType =
   | {
        type: 'Cart - LoadCart from cookies | storage';
        payload: ICartProduct[];
     }
   | {
        type: 'Cart - Update products in cart';
        payload: ICartProduct[];
     }
   | {
        type: 'Cart - Remove Product';
        payload: ICartProduct;
     }
   | {
        type: 'Cart - Update order summary';
        payload: {
           numberOfItems: number;
           subTotal: number;
           tax: number;
           total: number;
        };
     }
   | {
        type: 'Order - Order created';
     }
   | {
        type: 'Shipping - Load Shipping Address from cookies | storage';
        payload?: ShippingAddress;
     }
   | {
        type: 'Shipping - Set Shipping Address';
        payload?: ShippingAddress;
     };

export const cartReducer = (
   state: CartState,
   action: CartActionType
): CartState => {
   switch (action.type) {
      case 'Cart - LoadCart from cookies | storage':
         return {
            ...state,
            cart: action.payload,
            isLoadingFromCookies: false,
         };
      case 'Cart - Update products in cart':
         return {
            ...state,
            cart: [...action.payload],
         };
      case 'Cart - Remove Product':
         return {
            ...state,
            cart: state.cart.filter(
               (product) =>
                  !(
                     product.slug === action.payload.slug &&
                     product.size === action.payload.size
                  )
            ),
         };
      case 'Cart - Update order summary':
         return {
            ...state,
            orderSummary: action.payload,
         };
      case 'Shipping - Load Shipping Address from cookies | storage':
         return {
            ...state,
            shippingAddress: action.payload,
            isLoadingShippingAddressFromCookies: false,
         };
      case 'Shipping - Set Shipping Address':
         return {
            ...state,
            shippingAddress: action.payload,
         };
      case 'Order - Order created':
         return {
            ...state,
            cart: [],
            orderSummary: {
               numberOfItems: 0,
               subTotal: 0,
               tax: 0,
               total: 0,
            },
         };
      default:
         return state;
   }
};
