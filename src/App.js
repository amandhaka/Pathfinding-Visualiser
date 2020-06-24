import React from 'react';
import './App.css';
import PopUp from './PathFinder/PopUp.jsx';
import './bootstrap/dist/css/bootstrap.min.css'
import PathFinder from './PathFinder/Pathfinder'
import {Modal} from "reactstrap"
function App() {
  return (
    <div className="App">
      <PathFinder/>
      <PopUp/> 
    </div>
  );
}

export default App;
