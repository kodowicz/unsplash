import React from 'react';
import { Link } from 'react-router-dom';
import Masonry from 'react-masonry-component';
import styles from './photos.module.scss';

export default function Photos({ photos, location }) {
  const masonryOptions = {
    transitionDuration: 0
  }

  return (
    <Masonry className={styles.wrapper}
      options={masonryOptions}
    >
      { photos.map(photo => (
        <li className={styles.item} key={photo.id}>
          <Link to={{
            pathname: `/photos/${photo.id}`,
            state: { background: location }
          }}>
            <div className={styles.image}>
              <img
                id={photo.id}
                src={photo.urls.small}
                alt={photo.alt_description}
              />
            </div>
          </Link>
          <div className={styles.tags}>
            { photo.tags.map((tag, index) => (
              <div key={index}>
                <span className={styles.tag}>{tag.title}</span>
              </div>
            ))}
          </div>
        </li>
      ))}
    </Masonry>
  )
}
