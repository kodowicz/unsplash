import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useScrollGallery, useFetchSearched, useFetchPhotos } from '../../hooks/';
import { PAGE } from '../../variables';
import Photos from './photos/Photos';
import Topics from './topics/Topics';
import Form from '../search/form/Form';
import styles from './gallery.module.scss';

export default function Gallery() {
  const { id } = useParams();
  const [ page, setPage ] = useState(0);
  const { initPhotos, topics } = useFetchSearched(id);
  const morePhotos = useFetchPhotos(id, page);
  const bottomPos = useScrollGallery();

  // I want to fetch data the same way unsplash.com does:
  // fetch related topics and first 20 photos at once,
  // and fetch next photos onScrollBottom from different endpoint
  const [allPhotos, setAllPhotos] = useState([]);

  useEffect(() => setAllPhotos(initPhotos), [initPhotos]);

  useEffect(
    () => {
      setAllPhotos(oldPhotos => [...oldPhotos, ...morePhotos]);
    },
    [morePhotos]
  );

  useEffect(
    () => {
      if (bottomPos) setPage(page + PAGE)
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
      <Photos photos={allPhotos} />
    </div>
  );
}
