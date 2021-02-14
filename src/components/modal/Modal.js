import React, { useState, useEffect, useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import unsplash from '../../api/index';
import Photo from './photo/Photo';
import { ReactComponent as CloseSvg } from '../../assets/close.svg';
import styles from './modal.module.css';

function PhotoDetails() {
  const history = useHistory();
  const { id } = useParams();
  const modalRef = useRef();
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
    if (modalRef.current !== event.target) return;
    event.stopPropagation();
    history.goBack();
  };

  if (!details) return <></>;
  return(
    <div
      className={styles.modal}
      ref={modalRef}
      onClick={closeModal}
    >
      <button className={styles.close_button} onClick={() => history.goBack()}>
        <CloseSvg width="24px" hight="24px" />
      </button>
      <Photo details={details} />
    </div>
  );
}

export default PhotoDetails;
