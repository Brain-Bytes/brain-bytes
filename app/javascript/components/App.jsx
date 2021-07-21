import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NewByte from './pages/NewByte';

const App = () => {
  return (
    <>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/new-byte">
          <NewByte />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </>
  )
};

export default App;
