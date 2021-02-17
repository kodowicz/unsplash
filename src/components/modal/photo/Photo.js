import React from 'react';
import Author from './author/Author';
import Image from './image/Image';
import Info from './info/Info';
import styles from './photo.module.scss';

export default function Photo({ details }) {
  return (
    <div className={styles.wrapper}>
      <Author user={details.user} />
      <Image details={details} />
      <Info location={details.location} description={details.description}/>
    </div>
  )
};
