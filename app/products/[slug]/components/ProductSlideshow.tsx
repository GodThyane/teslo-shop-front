'use client';

import styles from './ProductSlideshow.module.css';
import 'react-slideshow-image/dist/styles.css';

import React from 'react';
import { Slide } from 'react-slideshow-image';

interface Props {
   images: string[];
}

const ProductSlideshow = ({ images }: Props) => {
   return (
      <Slide easing="ease" duration={7000} indicators>
         {images.map((image) => {
            return (
               <div className={styles.eachSlide} key={image}>
                  <div
                     style={{
                        backgroundImage: `url(${image})`,
                        backgroundSize: 'cover',
                     }}
                  ></div>
               </div>
            );
         })}
      </Slide>
   );
};

export default ProductSlideshow;
