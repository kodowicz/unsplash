import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import unsplash from '../api/index';

function PhotosList(props) {
  const { photoId } = useSelector(state => ({
    photoId: state.details?.id
  }))
  const [details, setDetails] = useState();

  useEffect(
    () => {
      if (photoId) {
        unsplash.photos.get({
          photoId
        }).then(({ response }) => setDetails(response))
      }
    },
    [photoId]
  );
  console.log(details?.urls.full);

  function handleClose() {
    // delete details
    
  }

  if (!details) return <></>;
  return (
    <div>
      <button onClick={handleClose}>close</button>
      <img width="32" src={details.user.profile_image.small} />
      <h1>{details.user.name}</h1>
      <p>@{details.user.username}</p>
      <p>ulubione</p>
      <p>collection</p>
      <img src={details.urls.regular}
        // srcset="https://w=334&q=80 334w, https://w=634&q=80 634w, https://w=668&q=80 668w, https://w=934&q=80 934w, https://w=1234&q=80 1234w, https://w=1268&q=80 1268w, https://w=1534&q=80 1534w, https://w=1834&q=80 1834w, https://w=1868&q=80 1868w, https://w=2134&q=80 2134w, https://w=2434&q=80 2434w, https://w=2468&q=80 2468w, https://w=2734&q=80 2734w, https://w=3334&q=80 3334w, https://w=3934&q=80 3934w, https://w=4307&q=80 4307w"
      />
      <p>{details.location.name}</p>
      <p>{details.description}</p>
      <button>share</button>
      <button>info</button>
    </div>
  );
}

export default PhotosList;
