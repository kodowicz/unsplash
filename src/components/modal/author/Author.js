import React, { useState, useEffect } from 'react';
import { ReactComponent as LikesSvg } from '../../../assets/likes.svg';
import { ReactComponent as CollectionSvg } from '../../../assets/collection.svg';
import styles from './author.module.css';

export default function Author({ user }) {
  const [ like, setLike ] = useState(false);

  return (
    <div className={styles.wrapper}>
      <div className={styles.author}>
        <div>
          <img className={styles.author__image} src={user.profile_image.small} />
        </div>
        <div>
          <span className={styles.author__name}>{user.name}</span>
          <span className={styles.author__username}>{'@'}{user.username}</span>
        </div>
      </div>
      <div>
        <button
          className={styles.collection}
          like={like}
          onClick={() => setLike(!like)}
        >
          <LikesSvg width="15px" hight="32px" />
        </button>
        <button className={styles.collection}>
          <CollectionSvg width="15px" hight="32px" />
        </button>
      </div>
    </div>
  )
};
