import React, { useState, useEffect, useRef, useLayoutEffect  } from 'react';
import { Link, useParams, useLocation } from "react-router-dom";
import unsplash from '../../api/index';
import Photos from './photos/Photos';
import Topics from './topics/Topics';
import Search from '../explore/search/Search';
import styles from './gallery.module.css';

export default function Gallery() {
  const [ photos, setPhotos ] = useState([]);
  const [ topics, setTopics ] = useState([]);
  const { id } = useParams();
  const location = useLocation();

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
        <Search />
      </div>
      <h1 className={styles.topic}>{id}</h1>
      <Topics topics={topics} />
      <Photos photos={photos} location={location} />
    </div>
  );
}
