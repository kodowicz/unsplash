import React, { useRef, useEffect, useState } from 'react';
import Masonry from 'react-masonry-component';
import Tags from './tags/Tags';
import Image from './image/Image';
import styles from './photos.module.scss';

export default function Photos({ photos }) {
  const masonryOptions = {
    transitionDuration: 0
  }

  return (
    <Masonry
      className={styles.wrapper}
      options={masonryOptions}
    >
      { photos.map(photo => (
        <li className={styles.item} key={photo.id}>
          <Image photo={photo} />
          <Tags tags={photo.tags} />
        </li>
      ))}
    </Masonry>
  )
}
