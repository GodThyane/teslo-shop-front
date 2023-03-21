import React from 'react';
import ProductSlug from '@/app/products/[slug]/components/ProductSlug';
import DefaultTags from '@/components/tags/default-tags';
import { fetchProduct } from '@/app/services/product.service';
import { redirect } from 'next/navigation';
import { fetchSlugs } from '@/app/products/services/product.slug.service';

interface Props {
   slug: string;
}

const ProductSlugPage = async ({ params: { slug } }: { params: Props }) => {
   const getProduct = async () => {
      return await fetchProduct(slug, {
         next: {
            revalidate: 60,
         },
      });
   };

   const product = await getProduct();

   if (!product) {
      redirect('/');
   }

   return (
      <>
         <DefaultTags
            description={product.description}
            title={product.title}
            imageFullUrl={product.images[0]}
         />
         <ProductSlug product={product} />
      </>
   );
};

export default ProductSlugPage;

export async function generateStaticParams() {
   return await fetchSlugs({
      next: {
         revalidate: 86400,
      },
   });
}
