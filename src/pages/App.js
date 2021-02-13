import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './Home';
// import Photos from './Photos';
import PhotosList from '../components/PhotosList';
import Details from '../components/Details';
// import NotFound from './404';

function App () {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/photos/:slug' component={PhotosList} />
        <Route path='/photos/details/:slug' component={Details} />
      </Switch>
    </BrowserRouter>
  )
};
// <Route path='/photos/:slug' component={Photos} />
// <Route path='*' component={NotFound} />

export default App;
