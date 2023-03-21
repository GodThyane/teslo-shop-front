import { IUser } from '@/interfaces/user';
import { ShippingAddress } from '@/context';
import { ISize } from '@/interfaces/products';

export interface IOrder {
   _id: string;
   user: IUser | string;
   orderItems: OrderItem[];
   shippingAddress: ShippingAddress;
   paymentResult?: string;
   orderSummary: OrderSummary;
   isPaid: boolean;
   paidAt?: string;
   transactionId?: string;
   createdAt: string;
   updatedAt: string;
}

export interface CreateOrder {
   orderItems: OrderItem[];
   shippingAddress: ShippingAddress;
   isPaid: boolean;
   orderSummary: OrderSummary;
}

export interface OrderItem {
   _id: string;
   title: string;
   size: ISize;
   quantity: number;
   slug: string;
   image: string;
   price: number;
   gender: 'men' | 'women' | 'kid' | 'unisex';
}

export interface OrderSummary {
   numberOfItems: number;
   subTotal: number;
   tax: number;
   total: number;
}
