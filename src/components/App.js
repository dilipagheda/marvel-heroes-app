import React, {useEffect, useState} from 'react'
import NavBar from './NavBar'
import Characters from './Characters'
import CharacterDetail from './CharacterDetail'
import Footer from './Footer'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

const doSomethingWith = (val) => console.log(val)

function App() {
  return (
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <Characters />
          </Route>
          <Route path="/detail/:id">
            <CharacterDetail />
          </Route>
        </Switch>
        <Footer />
      </Router>      
  );
}

export default App;
