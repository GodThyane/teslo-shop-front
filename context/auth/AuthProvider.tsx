'use client';

import React, { useReducer, useMemo, useEffect } from 'react';
import { AuthContext, authReducer } from './';
import { IUser } from '@/interfaces/user';
import tesloApi from '@/api/tesloApi';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useSession, signOut } from 'next-auth/react';

export interface AuthState {
   isLoggedIn: boolean;
   user?: IUser;
}

const Auth_INITIAL_STATE: AuthState = {
   isLoggedIn: false,
   user: undefined,
};

interface Props {
   children: React.ReactNode;
}

const AuthProvider = ({ children }: Props) => {
   const [state, dispatch] = useReducer(authReducer, Auth_INITIAL_STATE);
   const { data, status } = useSession();

   useEffect(() => {
      if (status === 'authenticated') {
         dispatch({ type: 'Auth - Login', payload: data?.user as IUser });
      }
   }, [data, status]);
   const login = async (email: string, password: string): Promise<boolean> => {
      try {
         const { data } = await tesloApi.post('/users/login', {
            email,
            password,
         });
         dispatchLogin(data);
         return true;
      } catch (e) {
         return false;
      }
   };

   /*useEffect(() => {
      const checkToken = async () => {
         const tokenC = Cookies.get('token') || '';

         if (!tokenC) return;

         try {
            const { data } = await tesloApi.get('/users/validate-token', {
               headers: {
                  authorization: `Bearer ${tokenC}`,
               },
            });
            dispatchLogin(data);
         } catch (e) {
            console.log({ e });
            Cookies.remove('token');
         }
      };

      checkToken();
   }, []);*/

   const dispatchLogin = (data: { token: string; user: IUser }) => {
      const { token, user } = data;
      Cookies.set('token', token);
      dispatch({ type: 'Auth - Login', payload: user });
   };

   const registerUser = async (
      email: string,
      password: string,
      name: string
   ): Promise<{ hasError: boolean; message?: string }> => {
      try {
         const { data } = await tesloApi.post('/users/register', {
            email,
            password,
            name,
         });
         dispatchLogin(data);
         return {
            hasError: false,
         };
      } catch (e) {
         if (axios.isAxiosError(e)) {
            return {
               hasError: true,
               message: e.response?.data.message,
            };
         }

         return {
            hasError: true,
            message: 'Error inesperado - intente más tarde',
         };
      }
   };

   const logout = async () => {
      Cookies.remove('cart');
      Cookies.remove('shippingAddress');
      await signOut();
   };

   const AuthMemo = useMemo(
      () => ({
         ...state,

         // Methods
         login,
         registerUser,
         logout,
      }),
      [state]
   );

   return (
      <AuthContext.Provider value={AuthMemo}>{children}</AuthContext.Provider>
   );
};

export default AuthProvider;
