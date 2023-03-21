import React from 'react';
import DefaultTags from '@/components/tags/default-tags';
import Summary from '@/app/checkout/summary/components/Summary';

const SummaryPage = () => {
   return (
      <>
         <DefaultTags
            description={'Resumen de la orden'}
            title={'Resumen de la orden'}
         />
         <Summary />
      </>
   );
};

export default SummaryPage;
