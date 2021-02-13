import React from 'react';
import Search from '../components/Search';

function Home() {
  return (
    <div>
      <h1>Unsplash</h1>
      <p>The Internet's source of freely-usable images.</p>
      <p>Powered by creators everywhere.</p>
      <Search />
      <p>Trending: flower, wallpapers, backgrounds, happy, love</p>
    </div>
  )
};

export default Home;
