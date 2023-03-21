'use client';

import React, { useContext, useEffect, useState } from 'react';
import {
   Box,
   Button,
   FormControl,
   Grid,
   MenuItem,
   TextField,
   Typography,
} from '@mui/material';
import { countries } from '@/utils';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { CartContext } from '@/context';

type FormData = {
   firstName: string;
   lastName: string;
   address: string;
   address2?: string;
   zipCode: string;
   city: string;
   country: string;
   phone: string;
};

const Address = () => {
   const router = useRouter();
   const {
      shippingAddress,
      setShippingAddress,
      isLoadingShippingAddressFromCookies,
   } = useContext(CartContext);

   const {
      register,
      handleSubmit,
      setValue,
      formState: { errors },
   } = useForm<FormData>();

   const [firstMount, setFirstMount] = useState(true);
   const [country, setCountry] = useState('COL');

   useEffect(() => {
      if (!isLoadingShippingAddressFromCookies && firstMount) {
         if (shippingAddress) {
            setValue('firstName', shippingAddress?.firstName);
            setValue('lastName', shippingAddress?.lastName);
            setValue('address', shippingAddress?.address);
            setValue('address2', shippingAddress?.address2);
            setValue('zipCode', shippingAddress?.zipCode);
            setValue('city', shippingAddress?.city);
            setValue('country', shippingAddress?.country);
            setValue('phone', shippingAddress?.phone);
            setCountry(shippingAddress?.country);
         }
         setFirstMount(false);
      }
   }, [
      firstMount,
      isLoadingShippingAddressFromCookies,
      setValue,
      shippingAddress,
   ]);
   const onSubmit = (data: FormData) => {
      setShippingAddress({
         address: data.address,
         address2: data.address2,
         city: data.city,
         country: data.country,
         firstName: data.firstName,
         lastName: data.lastName,
         phone: data.phone,
         zipCode: data.zipCode,
      });

      router.push('/checkout/summary');
   };

   if (firstMount) return <></>;

   return (
      <>
         <Typography variant="h1" component="h1">
            Dirección
         </Typography>
         <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2} sx={{ marginTop: 2 }}>
               <Grid item xs={12} sm={6}>
                  <TextField
                     label="Nombre"
                     variant="filled"
                     fullWidth
                     {...register('firstName', {
                        required: 'El nombre es requerido',
                     })}
                     error={!!errors.firstName}
                     helperText={errors.firstName?.message}
                  />
               </Grid>

               <Grid item xs={12} sm={6}>
                  <TextField
                     label="Apellido"
                     variant="filled"
                     fullWidth
                     {...register('lastName', {
                        required: 'El apellido es requerido',
                     })}
                     error={!!errors.lastName}
                     helperText={errors.lastName?.message}
                  />
               </Grid>

               <Grid item xs={12} sm={6}>
                  <TextField
                     label="Dirección"
                     variant="filled"
                     fullWidth
                     {...register('address', {
                        required: 'La dirección es requerido',
                     })}
                     error={!!errors.address}
                     helperText={errors.address?.message}
                  />
               </Grid>

               <Grid item xs={12} sm={6}>
                  <TextField
                     label="Dirección 2 (opcional)"
                     variant="filled"
                     fullWidth
                     {...register('address2', {
                        pattern: {
                           // No puede tener 1 o más espacios en blanco
                           value: /^\S+.*$/,
                           message: 'No puede tener 1 o más espacios en blanco',
                        },
                     })}
                     error={!!errors.address2}
                     helperText={errors.address2?.message}
                  />
               </Grid>

               <Grid item xs={12} sm={6}>
                  <TextField
                     label="Código postal"
                     variant="filled"
                     fullWidth
                     {...register('zipCode', {
                        required: 'El código postal es requerido',
                     })}
                     error={!!errors.zipCode}
                     helperText={errors.zipCode?.message}
                  ></TextField>
               </Grid>

               <Grid item xs={12} sm={6}>
                  <TextField
                     label="Ciudad"
                     variant="filled"
                     fullWidth
                     {...register('city', {
                        required: 'La ciudad es requerida',
                     })}
                     error={!!errors.city}
                     helperText={errors.city?.message}
                  ></TextField>
               </Grid>

               <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                     <TextField
                        select
                        variant="filled"
                        label="País"
                        defaultValue={country}
                        {...register('country', {
                           required: 'El país es requerido',
                        })}
                        error={!!errors.country}
                        helperText={errors.country?.message}
                     >
                        {countries.map((country) => (
                           <MenuItem key={country.code} value={country.code}>
                              {country.name}
                           </MenuItem>
                        ))}
                     </TextField>
                  </FormControl>
               </Grid>

               <Grid item xs={12} sm={6}>
                  <TextField
                     label="Teléfono"
                     variant="filled"
                     fullWidth
                     {...register('phone', {
                        required: 'El teléfono es requerido',
                     })}
                     error={!!errors.phone}
                     helperText={errors.phone?.message}
                  />
               </Grid>
            </Grid>

            <Box sx={{ mt: 5 }} display="flex" justifyContent="center">
               <Button
                  color="secondary"
                  className="circular-btn"
                  size="large"
                  type="submit"
               >
                  Revisar pedido
               </Button>
            </Box>
         </form>
      </>
   );
};

export default Address;
