import React from 'react';
import Author from '../author/Author';
import styles from './photo.module.css';

export default function ImageDetails({ details }) {
  return (
    <div className={styles.details}>
      <Author user={details.user} />
      <div className={styles.image_wrapper}>
        <img className={styles.image} src={details.urls.regular} />
      </div>
      <ImageInfo location={details.location} description={details.description}/>
    </div>
  )
};

function ImageInfo ({ location, description }) {
  return (
    <div className={styles.info_wrapper}>
      <div className={styles.location}>
        <span>{location.name}</span>
      </div>
      <div className={styles.buttons_wrapper}>
        <button className={styles.button}>share</button>
        <button className={styles.button}>info</button>
      </div>
    </div>
  );
}
