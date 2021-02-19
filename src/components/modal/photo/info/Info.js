import React, { useEffect, useState, useRef } from 'react';
import { useEllipsisActive } from '../../../../hooks';
import { ReactComponent as LocationSvg } from '../../../../assets/location.svg';
import { ReactComponent as ShareSvg } from '../../../../assets/share.svg';
import { ReactComponent as InformationSvg } from '../../../../assets/information.svg';
import styles from './info.module.scss';

export default function Info ({ location, description }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.information}>
        <Location location={location.name} />
        <Description description={description} />
      </div>
      <button className={styles.button}>
        <ShareSvg />
        <span>share</span>
      </button>
      <button className={styles.button}>
        <InformationSvg />
        <span>info</span>
      </button>
    </div>
  );
}


function Location({ location }) {
  if (!location) return <></>;

  return (
    <div className={styles.location}>
      <LocationSvg />
      <span>{location}</span>
    </div>
  );
}

function Description({ description }) {
  const [ unfold, setUnfold ] = useState(false);
  const textRef = useRef();
  const ellipsisActive = useEllipsisActive(textRef);

  return (
    <div className={styles.description}>
      <p
        ref={textRef}
        className={`${unfold ? styles.text_unfold : styles.text}`}
      >
        {description}
      </p>
      {(!unfold && ellipsisActive) &&
        <button
          className={styles.unfold}
          onClick={() => setUnfold(true)}
        >
          read more
        </button>
      }
    </div>
  );
}
