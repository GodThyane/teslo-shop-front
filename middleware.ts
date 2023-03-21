// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import * as process from 'process';

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest, res: NextResponse) {
   const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

   if (req.nextUrl.pathname.startsWith('/auth')) {
      const searchParams = new URLSearchParams(req.nextUrl.search);
      const destination = searchParams.get('p') || '/';
      if (session) {
         return NextResponse.redirect(new URL(destination, req.url));
      }
   }

   if (
      req.nextUrl.pathname.startsWith('/checkout') ||
      req.nextUrl.pathname.startsWith('/orders') ||
      req.nextUrl.pathname.startsWith('/admin')
   ) {
      const { pathname } = req.nextUrl;
      if (!session)
         return NextResponse.redirect(
            new URL(`/auth/login?p=${pathname}`, req.url)
         );
   }

   if (req.nextUrl.pathname.startsWith('/admin') && session) {
      const { user } = session as any;
      const { role } = user;
      const validRoles = ['admin', 'super-user', 'SEO'];
      if (!validRoles.includes(role)) {
         return NextResponse.redirect(new URL('/', req.url));
      }
   }

   if (req.nextUrl.pathname.startsWith('/orders/') && session) {
      const { pathname } = req.nextUrl;
      const id = pathname.split('/')[2];
      if (id !== 'history') {
         const base = process.env.NEXT_PUBLIC_BACKEND_URL || '';
         const { user } = session as any;
         const { _id } = user;
         const res = await fetch(`${base}/orders/${id}`, {
            cache: 'no-store',
         });
         if (!res.ok) {
            return NextResponse.redirect(new URL('/orders/history', req.url));
         }
         const order = await res.json();
         if (order.user !== _id)
            return NextResponse.redirect(new URL('/orders/history', req.url));
      }
   }

   return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
   matcher: [
      '/checkout/:path*',
      '/auth/:path*',
      '/orders/:path*',
      '/admin/:path*',
   ],
};
