import React from 'react';
import { BrowserRouter, Switch, Route, useLocation } from 'react-router-dom';

import Explore from '../components/explore/Explore';
import Gallery from '../components/gallery/Gallery';
import Modal from '../components/modal/Modal';
import NotFound from './404';

export default function App() {
  return (
    <BrowserRouter>
      <ModalSwitch />
    </BrowserRouter>
  );
}

function ModalSwitch() {
  let location = useLocation();
  let background = location.state && location.state.background;

  return (
    <div>
      <Switch location={background || location}>
        <Route exact path='/' component={Explore} />
        <Route path='/s/photos/:id' component={Gallery} />
        <Route path='*' component={NotFound} />
      </Switch>

      {background && <Route path='/photos/:id' component={Modal} />}
    </div>
  );
}
