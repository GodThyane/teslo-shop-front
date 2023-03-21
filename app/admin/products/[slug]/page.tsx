import React from 'react';
import { fetchProduct } from '@/app/services/product.service';
import { redirect } from 'next/navigation';
import DefaultTags from '@/components/tags/default-tags';
import ProductSlugAdmin from '@/app/admin/products/[slug]/components/ProductSlugAdmin';
import { IProduct } from '@/interfaces';

interface Props {
   slug: string;
}

const ProductSlugAdminPage = async ({
   params: { slug },
}: {
   params: Props;
}) => {
   const getProduct = async () => {
      return await fetchProduct(slug, {
         cache: 'no-store',
      });
   };

   let product: IProduct | null;

   if (slug === 'new') {
      product = {
         _id: '',
         slug: '',
         title: '',
         description: '',
         inStock: 0,
         gender: 'men',
         sizes: [],
         images: [],
         price: 0,
         tags: [],
         type: 'shirts',
      };

      delete product._id;
   } else {
      product = await getProduct();
   }

   if (!product) {
      redirect('/');
   }

   return (
      <>
         <DefaultTags
            description={`${
               slug === 'new'
                  ? 'Creando producto'
                  : `Editando producto: ${product.title}}`
            }`}
            title={`Teslo-Shop - Admin - ${
               slug === 'new' ? 'Creación' : `Edición: ${product.title}`
            }`}
            imageFullUrl={slug === 'new' ? '' : product.images[0]}
         />
         <ProductSlugAdmin product={product} />
      </>
   );
};

export default ProductSlugAdminPage;
