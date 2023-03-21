import { NextResponse, type NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import process from 'process';
import tesloApi from '@/api/tesloApi';
import { generateToken } from '@/utils';
import axios from 'axios';

export async function POST(req: NextRequest) {
   const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

   if (!session) {
      return NextResponse.redirect('/auth/login');
   }

   const {
      user: { _id, email },
   }: any = session;

   const token = generateToken(_id, email);

   const body = await req.json();
   try {
      const { data } = await tesloApi.post('/orders', body, {
         headers: {
            authorization: `Bearer ${token}`,
         },
      });
      return NextResponse.json(data, { status: 201 });
   } catch (error) {
      if (axios.isAxiosError(error)) {
         const { response } = error as any;
         const status = response?.status || 500;
         return NextResponse.json(
            {
               message: response?.data?.message || 'Error al crear la orden',
            },
            {
               status,
            }
         );
      }
      return NextResponse.json(
         {
            message: 'Error al crear la orden',
         },
         { status: 500 }
      );
   }
}
