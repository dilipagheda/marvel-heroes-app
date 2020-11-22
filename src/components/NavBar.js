import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import '../styles/NavBar.scss'

export default function NavBar() {

  return (
    <div>
      <AppBar position="static" className="nav-bar">
        <div className="app-title">
          Marvel Heroes
        </div>
      </AppBar>
    </div>
  );
}
