import React from 'react';
import styles from './topics.module.scss';

export default function Topics({ topics }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.topics}>
        { topics.map(topic => (
          <div
            key={topic.id}
            title={topic.title}
            className={styles.topic}
          >
            <span className={styles.title}>{topic.title}</span>
          </div>
        ))}
      </div>
      <div className={styles.blur}></div>
    </div>
  )
}
