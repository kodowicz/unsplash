import React, { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Blurhash } from 'react-blurhash';
import { useThumbnailSize } from '../../../../hooks/';
import styles from './image.module.scss';

export default function Image({ photo }) {
  const location = useLocation();
  const figureRef = useRef();
  const size = useThumbnailSize(figureRef, photo);

  return (
    <Link to={{
      pathname: `/photos/${photo.id}`,
      state: { background: location }
    }}>
      <div
        ref={figureRef}
        className={styles.figure}
        style={{
          width: size?.width,
          height: size?.height
        }}
      >
        { size &&
          <Blurhash
            hash={photo.blur_hash}
            width={size?.width}
            height={size?.height}
          />
        }
        <img
          className={styles.image}
          src={photo.urls.small}
          title={photo.alt_description}
          alt={photo.alt_description}
          style={{
            width: size?.width,
            height: size?.height
          }}
        />
      </div>

    </Link>
  );
}
