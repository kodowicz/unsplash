import React from 'react';
import styles from './topics.module.css';

export default function Topics({ topics }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.topics_wrapper}>
        { topics.map(topic => (
          <div className={styles.topic}>
            <span className={styles.title}>{topic.title}</span>
          </div>
        ))}
      </div>
      <div className={styles.blur}></div>
    </div>
  )
}
