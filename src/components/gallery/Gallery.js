import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import unsplash from '../../api/index';
import Photos from './photos/Photos';
import Topics from './topics/Topics';
import Form from '../search/form/Form';
import styles from './gallery.module.scss';

export default function Gallery() {
  const [ photos, setPhotos ] = useState([]);
  const [ topics, setTopics ] = useState([]);
  const { id } = useParams();

  useEffect(
    () => {
      unsplash.search.getPhotos({
        query: id
      }).then(({ response }) => setPhotos(response.results))
    },
    [id]
  );

  useEffect(
    () => {
      unsplash.search.getPhotos({
        query: id
      }).then(({ response }) => setPhotos(response.results))
      unsplash.topics.list({
        page: 1
      }).then(({ response }) => setTopics(response.results))
    },
    []
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
