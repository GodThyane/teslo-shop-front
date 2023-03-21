import React from 'react';
import DefaultTags from '@/components/tags/default-tags';
import SearchQuery from '@/app/search/[query]/SearchQuery';
import { fetchSearchProducts } from '@/app/search/[query]/services/search.product.service';
import { fetchProducts } from '@/app/services/product.service';

interface Props {
   query: string;
}

const SearchQueryPage = async ({ params: { query } }: { params: Props }) => {
   let foundProducts: boolean = false;

   const getProducts = async () => {
      const products = await fetchSearchProducts(query, { cache: 'no-cache' });
      if (products.length === 0) {
         foundProducts = false;
         return fetchProducts({ cache: 'no-cache' });
      }
      foundProducts = true;
      return products;
   };

   const products = await getProducts();

   return (
      <>
         <DefaultTags
            description={'Encuentra los mejores productos de Teslo aquí'}
            title={'Teslo-Shop - Search'}
         />
         <SearchQuery
            search={query}
            products={products}
            foundProducts={foundProducts}
         />
      </>
   );
};

export default SearchQueryPage;
