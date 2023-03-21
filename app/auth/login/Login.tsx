'use client';

import React, { useState } from 'react';
import {
   Box,
   Button,
   Chip,
   Divider,
   Grid,
   TextField,
   Typography,
} from '@mui/material';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { ErrorOutline } from '@mui/icons-material';
import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import tesloApi from '@/api/tesloApi';

type FormData = {
   email: string;
   password: string;
};

const Login = ({ providers }: { providers: any }) => {
   const searchParams = useSearchParams();

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<FormData>();

   const [showError, setShowError] = useState(false);

   const onLogin = async ({ email, password }: FormData) => {
      setShowError(false);

      try {
         await tesloApi.post('/users/check-user-email-password', {
            email,
            password,
         });
         await signIn('credentials', {
            email,
            password,
         });
      } catch (error) {
         setShowError(true);
         setTimeout(() => setShowError(false), 3000);
      }
   };

   return (
      <form onSubmit={handleSubmit(onLogin)} noValidate>
         <Box sx={{ width: 350, padding: '10px 20px' }}>
            <Grid container spacing={2}>
               <Grid item xs={12}>
                  <Typography variant="h1" component="h1">
                     Iniciar sesión
                  </Typography>
                  <Chip
                     label="No reconocemos ese usuario / contraseña"
                     color="error"
                     icon={<ErrorOutline />}
                     className="fadeIn"
                     sx={{ display: showError ? 'flex' : 'none' }}
                  />
               </Grid>
               <Grid item xs={12}>
                  <TextField
                     type="email"
                     label="Correo electrónico"
                     variant="filled"
                     fullWidth
                     {...register('email', {
                        required: 'El correo es requerido',
                        pattern: {
                           value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                           message: 'El correo no es válido',
                        },
                     })}
                     error={!!errors.email}
                     helperText={errors.email?.message}
                  ></TextField>
               </Grid>
               <Grid item xs={12}>
                  <TextField
                     label="Contraseña"
                     type="password"
                     variant="filled"
                     fullWidth
                     {...register('password', {
                        required: 'La contraseña es requerida',
                        minLength: {
                           value: 6,
                           message:
                              'La contraseña debe tener al menos 6 caracteres',
                        },
                     })}
                     error={!!errors.password}
                     helperText={errors.password?.message}
                  ></TextField>
               </Grid>

               <Grid item xs={12}>
                  <Button
                     type="submit"
                     color="secondary"
                     className="circular-btn"
                     size="large"
                     fullWidth
                  >
                     Ingresar
                  </Button>
               </Grid>
               <Grid item xs={12} display="flex" justifyContent="end">
                  <Link
                     href={
                        searchParams
                           ? searchParams.get('p')
                              ? `/auth/register?p=${searchParams.get('p')}`
                              : '/auth/register'
                           : '/auth/register'
                     }
                     passHref
                     style={{ color: 'black' }}
                  >
                     ¿No tienes una cuenta?
                  </Link>
               </Grid>

               {/*Providers*/}
               <Grid
                  item
                  xs={12}
                  display="flex"
                  justifyContent="end"
                  flexDirection="column"
               >
                  <Divider sx={{ width: '100%', mb: 2 }} />
                  {Object.values(providers).map((provider: any) => {
                     if (provider.id === 'credentials') {
                        return null;
                     }
                     return (
                        <Button
                           key={provider.id}
                           onClick={() => signIn(provider.id)}
                           variant="contained"
                           color="primary"
                           sx={{ mb: 1 }}
                        >
                           Iniciar sesión con {provider.name}
                        </Button>
                     );
                  })}
               </Grid>
            </Grid>
         </Box>
      </form>
   );
};
export default Login;
