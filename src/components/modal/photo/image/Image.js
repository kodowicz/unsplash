import React, { useRef } from 'react';
import { Blurhash } from 'react-blurhash';
import { useImageSize } from '../../../../hooks/';
import styles from './image.module.scss';

export default function Image({ details }) {
  const figureRef = useRef();
  const size = useImageSize(figureRef, details);

  return (
    <figure
      ref={figureRef}
      className={styles.wrapper}
    >
      <div className={styles.container}>
        <Blurhash
          hash={details.blur_hash}
          width={size.width}
          height={size.height}
        />
        <img
          className={styles.image}
          src={details.urls.regular}
          alt={details.alt_desctiption}
          style={{
            width: size.width,
            height: size.height
          }}
        />
      </div>
    </figure>
  )
};
