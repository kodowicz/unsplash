import React, { useState, useEffect } from 'react';
import { ReactComponent as LikesSvg } from '../../../../assets/likes.svg';
import { ReactComponent as CollectionSvg } from '../../../../assets/collection.svg';
import styles from './author.module.scss';

export default function Author({ user }) {
  const [ like, setLike ] = useState(false);

  return (
    <div className={styles.wrapper}>
      <div className={styles.author}>
        <div>
          <img
            className={styles.image}
            src={user.profile_image.small}
            alt={`Go to ${user.name}'s profile`}
          />
        </div>
        <div>
          <span className={styles.name}>{user.name}</span>
          <span className={styles.username}>
            {'@'}
            {user.username}
          </span>
        </div>
      </div>
      <button
        className={`${styles.collection} ${like ? styles.collection_liked : ''}`}
        onClick={() => setLike(!like)}
      >
        <LikesSvg />
      </button>
      <button className={styles.collection}>
        <CollectionSvg />
      </button>
    </div>
  );
}
