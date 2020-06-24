import React from 'react';
import './Node.css';
const Node = ({row,col,onMouseDown,onMouseUp,onMouseEnter,isStart,isFinish,isWall,onMouseClick}) => {
    const extraClass=isFinish?
    'node-finish': isStart?
    'node-start':isWall?
    'node-wall':'';
    return ( 
    <div
    className={`node ${extraClass}`}
    id={`node-${row}-${col}`}
    onClick={()=>onMouseClick(row,col)}
    onMouseDown={()=>onMouseDown(row,col)}
    onMouseEnter={()=>onMouseEnter(row,col)}
    onMouseUp={()=>onMouseUp()}
    ></div>
    );
}
 
export default Node;