import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useScroll, useFetchPhotos, useFetchTopics } from '../../hooks/';
import Photos from './photos/Photos';
import Topics from './topics/Topics';
import Form from '../search/form/Form';
import styles from './gallery.module.scss';

export default function Gallery() {
  const [ perPage, setPerPage ] = useState(10);
  const { id } = useParams();
  const photos = useFetchPhotos(id, perPage);
  const topics = useFetchTopics();
  const bottomPos = useScroll();

  useEffect(
    () => {
      if (bottomPos) setPerPage(perPage + 10)
    },
    [bottomPos]
  );

  return (
    <div>
      <div className={styles.gallery_search}>
        <Form />
      </div>
      <div className={styles.topic_wrapper}>
        <h1 className={styles.topic}>{id}</h1>
        <Topics topics={topics} />
      </div>
      <Photos photos={photos} />
    </div>
  );
}
