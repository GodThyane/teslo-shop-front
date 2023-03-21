import NextAuth, { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';
import tesloApi from '@/api/tesloApi';

export const authOptions: NextAuthOptions = {
   pages: {
      signIn: '/auth/login',
      newUser: ' /auth/register',
   },
   session: {
      maxAge: 2592000, // 30 days
      strategy: 'jwt',
      updateAge: 86400,
   },
   providers: [
      Credentials({
         name: 'Custom Login',
         credentials: {
            email: {
               label: 'Correo electrónico',
               type: 'email',
               placeholder: 'correo@gmail.com',
            },
            password: {
               label: 'Contraseña',
               type: 'password',
               placeholder: '********',
            },
         },
         async authorize(credentials, req) {
            const body = {
               email: credentials!.email || '',
               password: credentials!.password || '',
            };

            try {
               const { data } = await tesloApi.post(
                  '/users/check-user-email-password',
                  body
               );

               return data;
            } catch (error) {
               return null;
            }
         },
      }),

      GithubProvider({
         clientId: process.env.GITHUB_ID || '',
         clientSecret: process.env.GITHUB_SECRET || '',
      }),
      // ...add more providers here
   ],
   callbacks: {
      async jwt({ token, account, user }: any) {
         if (account) {
            token.accessToken = account.access_token;
            switch (account.type) {
               case 'oauth':
                  const body = {
                     email: user?.email || '',
                     name: user?.name || '',
                  };
                  try {
                     const { data } = await tesloApi.post('/users/oauth', body);
                     token.user = data;
                  } catch (e) {
                     return;
                  }
                  break;

               case 'credentials':
                  token.user = user;
                  break;
            }
         }

         return token;
      },
      async session({ session, token, user }: any) {
         session.accessToken = token.accessToken;
         session.user = token.user;
         return session;
      },
   },
};

export default NextAuth(authOptions);
