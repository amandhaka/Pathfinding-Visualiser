import React from 'react';
import './App.css';
import PopUp from './PathFinder/PopUp.jsx';
import './bootstrap/dist/css/bootstrap.min.css'
import PathFinder from './PathFinder/Pathfinder'
function App() {
  return (
    <div className="App">
       <PopUp/>
      <PathFinder/> 
    </div>
  );
}

export default App;
