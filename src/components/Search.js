import React, { useEffect, useState } from 'react';
import unsplash from '../api/index';

// https://tarekraafat.github.io/autoComplete.js/#/?id=introduction


function Search() {
  useEffect(
    () => {
      unsplash.topics.get({ topicIdOrSlug: 'fashion'
      }).then(res => console.log(res.response))
    },
    []
  );
  return (
    <form>
      <input
        // onChange={search}
        type='search'
        placeholder='Search free high-resolution photos'
        aria-label='Search free high-resolution photos'
      />
    </form>
  )
}

export default Search;
