import React, { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Blurhash } from 'react-blurhash';
import { useThumbnailSize } from '../../../../hooks/';
import styles from './image.module.scss';

export default function Image({ photo }) {
  const location = useLocation();
  const figureRef = useRef();
  const size = useThumbnailSize(figureRef, photo);

  const author = (
    <div className={styles.author}>
      <div>
        <img
          className={styles.thumbnail}
          src={photo.user.profile_image.small}
        />
      </div>
      <span className={styles.name}>{photo.user.name}</span>
    </div>
  );

  const blurhash = (
    <Blurhash
      className={styles.blurhash}
      hash={photo.blur_hash}
      width={size?.width}
      height={size?.height}
    />
  );

  const image = (
    <img
      className={styles.image}
      src={photo.urls.small}
      title={photo.alt_description}
      alt={photo.alt_description}
    />
  );

  return (
    <Link
      to={{
        pathname: `/photos/${photo.id}`,
        state: { background: location }
      }}
    >
      <div
        ref={figureRef}
        className={styles.figure}
        style={{
          width: size?.width,
          height: size?.height
        }}
      >
        {author}
        {size && photo.blur_hash && blurhash}
        {image}
      </div>
    </Link>
  );
}
