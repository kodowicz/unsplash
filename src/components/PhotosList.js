import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { showDetails, hideDetails } from '../store/actions';
import unsplash from '../api/index';

function PhotosList() {
  const [ items, setItems ] = useState([]);
  const { slug } = useParams();
  const dispatch = useDispatch();
  const setDetails = (state) => dispatch(showDetails(state));
  // const clearDetails = (state) => dispatch(hideDetails(state));

  useEffect(
    () => {
      unsplash.search.getPhotos({
        query: slug
      }).then(({ response }) => setItems(response.results))
    },
    []
  );

  function openDetails(event) {
    const details = items.find(item => item.id === event.target.id)
    setDetails(details);
  };


  return (
    <ul>
      { items.map(item => (
        <li key={item.id}>
          <img
            height='200px'
            id={item.id}
            onClick={openDetails}
            src={item.urls.small}
            alt={item.alt_description}
          />
          <div className='tags'>
            {item.tags.map((tag, index) => <p key={index}>{tag.title}</p>)}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default PhotosList;
