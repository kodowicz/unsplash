import React, { useState, useRef, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useScrollElement } from '../../../hooks/';
import { MOBILESCROLL, DESKTOPSCROLL } from '../../../variables';
import { ReactComponent as ArrowSvg } from '../../../assets/arrow.svg';
import styles from './topics.module.scss';

export default function Topics({ topics }) {
  const { id } = useParams();
  const wrapperRef = useRef();
  const [ scroll, setScroll ] = useState(0);
  const [ forwardVisible, setForward ] = useState(false);
  const [ backwardVisible, setBackward ] = useState(false);
  const scoochCount = window.innerWidth <= 768 ? MOBILESCROLL : DESKTOPSCROLL;

  useScrollElement(
    () => {
      const currScroll = wrapperRef.current.scrollLeft;
      const maxScroll = wrapperRef.current.scrollWidth - wrapperRef.current.clientWidth;
      const ptc = currScroll / maxScroll || 0;

      if (ptc > 0.1) {
        setBackward(false);
      } else {
        setBackward(true);
      }

      if (ptc < 0.9) {
        setForward(false);
      } else {
        setForward(true);
      }
    },
    [wrapperRef.current]
  );

  useEffect(
    () => {
      setScroll(0);
      setForward(false);
      setBackward(true);
      wrapperRef.current.scrollTo(0, 0);
    },
    [id]
  );

  function handleForward() {
    const currScroll = wrapperRef.current.scrollLeft;
    const maxScroll = wrapperRef.current.scrollWidth - wrapperRef.current.clientWidth;
    const scrollBy = Math.ceil(maxScroll / scoochCount) + 1;

    wrapperRef.current.scrollBy(scrollBy, 0);
    setScroll(currScroll || scrollBy);
  };

  function handleBackword() {
    const currScroll = wrapperRef.current.scrollLeft;
    const maxScroll = wrapperRef.current.scrollWidth - wrapperRef.current.clientWidth;
    const scrollBy = Math.ceil(maxScroll / scoochCount) + 1;

    wrapperRef.current.scrollBy(-scrollBy, 0);
    setScroll(currScroll);
  };

  const backwardButton = (
    <button
      className={`${styles.button} ${styles.backward_button}`}
      hidden={backwardVisible}
      onClick={handleBackword}
    >
      <ArrowSvg />
    </button>
  );

  const forwardButton = (
    <button
      className={styles.button}
      hidden={forwardVisible}
      onClick={handleForward}
    >
      <ArrowSvg />
    </button>
  );

  const topicLinks = topics.map((topic, index) => (
    <div
      key={index}
      title={topic.title}
      className={styles.topic}
    >
      <Link to={`/s/photos/${topic.title}/`}>
        <span className={styles.title}>{topic.title}</span>
      </Link>
    </div>
  ));

  return (
    <div className={styles.wrapper}>
      {backwardButton}
      {forwardButton}
      <div
        ref={wrapperRef}
        className={`
          ${styles.scroller}
          ${!backwardVisible && styles.backward_shadow}
          ${!forwardVisible && styles.forward_shadow}
        `}
      >
        <div className={styles.topics}>
          {topicLinks}
        </div>
      </div>
    </div>
  )
}
