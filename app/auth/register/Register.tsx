'use client';

import React, { useContext, useState } from 'react';
import { Box, Button, Chip, Grid, TextField, Typography } from '@mui/material';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { ErrorOutline } from '@mui/icons-material';
import { AuthContext } from '@/context';
import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';

type FormData = {
   name: string;
   email: string;
   password: string;
};

const Register = () => {
   const { registerUser } = useContext(AuthContext);

   const searchParams = useSearchParams();

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<FormData>();

   const [showError, setShowError] = useState(false);
   const [errorMessage, setErrorMessage] = useState('');

   const onRegister = async ({ name, email, password }: FormData) => {
      setShowError(false);
      const { hasError, message } = await registerUser(email, password, name);

      if (hasError) {
         setShowError(true);
         setErrorMessage(message!);
         setTimeout(() => setShowError(false), 3000);
         return;
      }

      await signIn('credentials', {
         email,
         password,
      });
   };

   return (
      <form onSubmit={handleSubmit(onRegister)} noValidate>
         <Box sx={{ width: 350, padding: '10px 20px' }}>
            <Grid container spacing={2}>
               <Grid item xs={12}>
                  <Typography variant="h1" component="h1">
                     Crear cuenta
                  </Typography>
                  <Chip
                     label={errorMessage}
                     color="error"
                     icon={<ErrorOutline />}
                     className="fadeIn"
                     sx={{ display: showError ? 'flex' : 'none' }}
                  />
               </Grid>
               <Grid item xs={12}>
                  <TextField
                     label="Nombre"
                     variant="filled"
                     fullWidth
                     {...register('name', {
                        required: 'El nombre es requerido',
                        minLength: {
                           value: 3,
                           message:
                              'El nombre debe tener al menos 3 caracteres',
                        },
                     })}
                     error={!!errors.name}
                     helperText={errors.name?.message}
                  ></TextField>
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
                     Registrarse
                  </Button>
               </Grid>
               <Grid item xs={12} display="flex" justifyContent="end">
                  <Link
                     href={
                        searchParams
                           ? searchParams.get('p')
                              ? `/auth/login?p=${searchParams.get('p')}`
                              : '/auth/login'
                           : '/auth/login'
                     }
                     passHref
                     style={{ color: 'black' }}
                  >
                     ¿Ya tienes una cuenta?
                  </Link>
               </Grid>
            </Grid>
         </Box>
      </form>
   );
};

export default Register;
