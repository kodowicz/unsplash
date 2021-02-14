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
    <div>
      <p>{location.name}</p>
      <button>share</button>
      <button>info</button>
    </div>
  );
}
