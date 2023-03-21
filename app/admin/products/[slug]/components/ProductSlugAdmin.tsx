'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
   DriveFileRenameOutline,
   SaveOutlined,
   UploadOutlined,
} from '@mui/icons-material';
import {
   Box,
   Button,
   capitalize,
   Card,
   CardActions,
   CardMedia,
   Checkbox,
   Chip,
   Divider,
   FormControl,
   FormControlLabel,
   FormGroup,
   FormLabel,
   Grid,
   Radio,
   RadioGroup,
   TextField,
} from '@mui/material';
import { IProduct, ISize, IValidTypes } from '@/interfaces';
import AdminLayout from '@/components/layouts/AdminLayout';
import { useForm } from 'react-hook-form';
import tesloApi from '@/api/tesloApi';
import { useRouter } from 'next/navigation';

const validTypes = ['shirts', 'pants', 'hoodies', 'hats'];
const validGender = ['men', 'women', 'kid', 'unisex'];
const validSizes: ISize[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

interface Props {
   product: IProduct;
}

interface FormData {
   _id?: string;
   description: string;
   images: string[];
   inStock: number;
   price: number;
   sizes: ISize[];
   slug: string;
   tags: string[];
   title: string;
   type: IValidTypes;
   gender: string;
}

const ProductSlugAdmin = ({ product }: Props) => {
   const router = useRouter();
   const fileInputRef = useRef<HTMLInputElement>(null);

   const {
      register,
      handleSubmit,
      formState: { errors },
      getValues,
      setValue,
      watch,
   } = useForm({
      defaultValues: product,
   });

   const [newTagValue, setNewTagValue] = useState('');
   const [isSaving, setIsSaving] = useState(false);

   useEffect(() => {
      const subs = watch((value, { name }) => {
         if (name === 'title') {
            const newSlug =
               value.title
                  ?.trim()
                  .replaceAll(/ /g, '_')
                  .replaceAll("'", '')
                  .toLowerCase() || '';
            setValue('slug', newSlug);
         }
      });

      return () => subs.unsubscribe();
   }, [setValue, watch]);

   const onNewTag = () => {
      const currentTags = getValues('tags');
      const newTag = newTagValue.trim().toLowerCase();
      if (!currentTags.includes(newTag) && newTag) {
         setValue('tags', [...currentTags, newTag], {
            shouldValidate: true,
         });
      }
      setNewTagValue('');
   };

   const onDeleteTag = (tag: string) => {
      const currentTags = getValues('tags');
      setValue(
         'tags',
         currentTags.filter((t) => t !== tag),
         {
            shouldValidate: true,
         }
      );
   };

   const onFileSelected = async ({
      target,
   }: React.ChangeEvent<HTMLInputElement>) => {
      if (!target.files || target.files.length === 0) return;

      try {
         for (const file of target.files) {
            const formData = new FormData();
            formData.append('file', file);
            const { data } = await tesloApi.post<{ url: string }>(
               '/admin/upload',
               formData
            );
            setValue('images', [...getValues('images'), data.url], {
               shouldValidate: true,
            });
         }
      } catch (e) {
         console.log({ e });
      }
   };

   const onChangeType = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value as IValidTypes;
      setValue('type', value, {
         shouldValidate: true,
      });
   };

   const onChangeGender = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value as 'men' | 'women' | 'kid' | 'unisex';
      setValue('gender', value, {
         shouldValidate: true,
      });
   };

   const onChangeSizes = (size: ISize) => {
      const currentSizes = getValues('sizes');
      if (currentSizes.includes(size)) {
         setValue(
            'sizes',
            currentSizes.filter((s) => s !== size),
            {
               shouldValidate: true,
            }
         );
      } else {
         setValue('sizes', [...currentSizes, size], {
            shouldValidate: true,
         });
      }
   };

   const onRemoveImage = (url: string) => {
      const currentImages = getValues('images');
      setValue(
         'images',
         currentImages.filter((img) => img !== url),
         {
            shouldValidate: true,
         }
      );
   };

   const onSubmit = async (form: FormData) => {
      if (form.images.length < 2)
         return alert('Debe agregar al menos 2 imágenes');
      setIsSaving(true);

      try {
         form.inStock = Number(form.inStock);
         form.price = Number(form.price);
         const id = product._id ? product._id : '';
         await tesloApi({
            url: `/admin/products/${id}`,
            method: form._id ? 'PUT' : 'POST',
            data: form,
         });

         if (!form._id) {
            router.replace(`/admin/products/${form.slug}`);
         } else {
            setIsSaving(false);
         }
      } catch (e) {
         console.log({ e });
         setIsSaving(false);
      }
   };

   return (
      <AdminLayout
         title={'Producto'}
         subTitle={`Editando: ${product.title}`}
         icon={<DriveFileRenameOutline />}
      >
         <form onSubmit={handleSubmit(onSubmit)}>
            <Box display="flex" justifyContent="end" sx={{ mb: 1 }}>
               <Button
                  color="secondary"
                  startIcon={<SaveOutlined />}
                  sx={{ width: '150px' }}
                  type="submit"
                  disabled={isSaving}
               >
                  Guardar
               </Button>
            </Box>

            <Grid container spacing={2}>
               {/* Data */}
               <Grid item xs={12} sm={6}>
                  <TextField
                     label="Título"
                     variant="filled"
                     fullWidth
                     sx={{ mb: 1 }}
                     {...register('title', {
                        required: 'Este campo es requerido',
                        minLength: { value: 2, message: 'Mínimo 2 caracteres' },
                     })}
                     error={!!errors.title}
                     helperText={errors.title?.message}
                  />

                  <TextField
                     label="Descripción"
                     variant="filled"
                     fullWidth
                     multiline
                     sx={{ mb: 1 }}
                     {...register('description', {
                        required: 'Este campo es requerido',
                     })}
                     error={!!errors.description}
                     helperText={errors.description?.message}
                  />

                  <TextField
                     label="Inventario"
                     type="number"
                     variant="filled"
                     fullWidth
                     sx={{ mb: 1 }}
                     {...register('inStock', {
                        required: 'Este campo es requerido',
                        minLength: {
                           value: 0,
                           message: 'Mínimo  de valor cero',
                        },
                     })}
                     error={!!errors.inStock}
                     helperText={errors.inStock?.message}
                  />

                  <TextField
                     label="Precio"
                     type="number"
                     variant="filled"
                     fullWidth
                     sx={{ mb: 1 }}
                     {...register('price', {
                        required: 'Este campo es requerido',
                        minLength: {
                           value: 0,
                           message: 'Mínimo  de valor cero',
                        },
                     })}
                     error={!!errors.price}
                     helperText={errors.price?.message}
                  />

                  <Divider sx={{ my: 1 }} />

                  <FormControl sx={{ mb: 1 }}>
                     <FormLabel>Tipo</FormLabel>
                     <RadioGroup
                        row
                        value={getValues('type')}
                        onChange={onChangeType}
                     >
                        {validTypes.map((option) => (
                           <FormControlLabel
                              key={option}
                              value={option}
                              control={<Radio color="secondary" />}
                              label={capitalize(option)}
                           />
                        ))}
                     </RadioGroup>
                  </FormControl>

                  <FormControl sx={{ mb: 1 }}>
                     <FormLabel>Género</FormLabel>
                     <RadioGroup
                        row
                        value={getValues('gender')}
                        onChange={onChangeGender}
                     >
                        {validGender.map((option) => (
                           <FormControlLabel
                              key={option}
                              value={option}
                              control={<Radio color="secondary" />}
                              label={capitalize(option)}
                           />
                        ))}
                     </RadioGroup>
                  </FormControl>

                  <FormGroup>
                     <FormLabel>Tallas</FormLabel>
                     {validSizes.map((size: ISize) => (
                        <FormControlLabel
                           key={size}
                           control={
                              <Checkbox
                                 checked={getValues('sizes').includes(size)}
                              />
                           }
                           onChange={() => onChangeSizes(size)}
                           label={size}
                        />
                     ))}
                  </FormGroup>
               </Grid>

               {/* Tags e imagenes */}
               <Grid item xs={12} sm={6}>
                  <TextField
                     label="Slug - URL"
                     variant="filled"
                     fullWidth
                     sx={{ mb: 1 }}
                     {...register('slug', {
                        required: 'Este campo es requerido',
                        validate: (value) =>
                           value.trim().includes(' ')
                              ? 'No puede contener espacios'
                              : undefined,
                     })}
                     error={!!errors.slug}
                     helperText={errors.slug?.message}
                  />

                  <TextField
                     label="Etiquetas"
                     variant="filled"
                     fullWidth
                     sx={{ mb: 1 }}
                     onKeyUp={({ code }) =>
                        code === 'Space' ? onNewTag() : undefined
                     }
                     value={newTagValue}
                     onChange={(e) => setNewTagValue(e.target.value)}
                     helperText="Presiona [spacebar] para agregar"
                  />

                  <Box
                     sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        listStyle: 'none',
                        p: 0,
                        m: 0,
                     }}
                     component="ul"
                  >
                     {getValues('tags').map((tag) => {
                        return (
                           <Chip
                              key={tag}
                              label={tag}
                              onDelete={() => onDeleteTag(tag)}
                              color="primary"
                              size="small"
                              sx={{ ml: 1, mt: 1 }}
                           />
                        );
                     })}
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Box display="flex" flexDirection="column">
                     <FormLabel sx={{ mb: 1 }}>Imágenes</FormLabel>
                     <Button
                        color="secondary"
                        fullWidth
                        startIcon={<UploadOutlined />}
                        sx={{ mb: 3 }}
                        onClick={() => fileInputRef.current?.click()}
                     >
                        Cargar imagen
                     </Button>
                     <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept="image/png, image/jpeg, image/gif"
                        style={{ display: 'none' }}
                        onChange={onFileSelected}
                     />

                     <Chip
                        label="Es necesario al menos 2 imagenes"
                        color="error"
                        variant="outlined"
                        className="fadeIn"
                        sx={{
                           display:
                              getValues('images').length < 2 ? 'flex' : 'none',
                        }}
                     />

                     <Grid container spacing={2}>
                        {getValues('images').map((img) => (
                           <Grid item xs={4} sm={3} key={img}>
                              <Card>
                                 <CardMedia
                                    component="img"
                                    className="fadeIn"
                                    image={img}
                                    alt={img}
                                 />
                                 <CardActions>
                                    <Button
                                       fullWidth
                                       color="error"
                                       onClick={() => onRemoveImage(img)}
                                    >
                                       Borrar
                                    </Button>
                                 </CardActions>
                              </Card>
                           </Grid>
                        ))}
                     </Grid>
                  </Box>
               </Grid>
            </Grid>
         </form>
      </AdminLayout>
   );
};

export default ProductSlugAdmin;
