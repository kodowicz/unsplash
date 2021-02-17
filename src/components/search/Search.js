import React, { useState, useEffect } from 'react';
import Form from './form/Form';
import styles from './search.module.scss';

export default function Search() {
  return (
    <div className={styles.background}>
      <div className={styles.header_wrapper}>
        <h1 className={styles.title}>Unsplash</h1>
        <div>
          <p className={styles.info}>
            {'The internet’s source of '}
            <span className={styles.link}>freely-usable images</span>
            {'.'}
          </p>
          <p className={styles.info}>Powered by creators everywhere.</p>
          <Form />
        </div>
        <p>Trending: flower, wallpapers, backgrounds, happy, love</p>
      </div>
    </div>
  )
};
