import React from 'react';
import styles from './tags.module.scss';

export default function Tags({ tags }) {
  return (
    <div className={styles.wrapper}>
      { tags.map((tag, index) => (
        <div key={index}>
          <span className={styles.tag}>{tag.title}</span>
        </div>
      ))}
    </div>
  );
}
