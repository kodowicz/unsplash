import React, { useState, useEffect } from 'react';
import Search from './search/Search';
import styles from './explore.module.css';

export default function Explore() {
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
          <Search />
        </div>
        <p>Trending: flower, wallpapers, backgrounds, happy, love</p>
      </div>
    </div>
  )
};
