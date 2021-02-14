import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import unsplash from '../../api/index';
import Photo from './photo/Photo';
import { ReactComponent as CloseSvg } from '../../assets/close.svg';
import styles from './modal.module.css';

function PhotoDetails() {
  let history = useHistory();
  let { id } = useParams();
  const [ details, setDetails ] = useState();

  useEffect(
    () => {
      unsplash.photos.get({
        photoId: id
      }).then(({ response }) => setDetails(response))
    },
    []
  );

  function closeModal(event) {
    event.stopPropagation();
    history.goBack();
  };

  if (!details) return <></>;
  return(
    <div className={styles.modal} onClick={closeModal}>
      <button className={styles.close_button} onClick={closeModal}>
        <CloseSvg width="24px" hight="24px" />
      </button>
      <Photo details={details} />
    </div>
  );
}

export default PhotoDetails;
