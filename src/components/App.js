import React from 'react'
import NavBar from './NavBar'
import Characters from './Characters'
import CharacterDetail from './CharacterDetail'
import Footer from './Footer'
import Store from '../Store'
import NotFound from './NotFound'
import ServerError from './ServerError'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Store>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <Characters />
          </Route>
          <Route path="/detail/:id">
            <CharacterDetail />
          </Route>
          <Route path="/error">
            <ServerError />
          </Route>
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </Router>      
    </Store>
  );
}

export default App;
