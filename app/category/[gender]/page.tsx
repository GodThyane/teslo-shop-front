import React from 'react';
import CategoryGender from '@/app/category/[gender]/CategoryGender';
import DefaultTags from '@/components/tags/default-tags';
import { redirect } from 'next/navigation';

interface Props {
   gender: string;
}

const genders = ['women', 'men', 'kid'];

const CategoryGenderPage = ({ params: { gender } }: { params: Props }) => {
   if (!genders.includes(gender)) redirect('/');

   const getGender = () => {
      return gender === 'men'
         ? 'Hombres'
         : gender === 'women'
         ? 'Mujeres'
         : 'Niños';
   };

   const genderName = getGender();

   return (
      <>
         <DefaultTags
            description={`Productos de: ${genderName}`}
            title={`Tienda | Categoria: ${genderName}`}
         />
         <CategoryGender gender={gender} genderName={genderName} />
      </>
   );
};

export default CategoryGenderPage;
