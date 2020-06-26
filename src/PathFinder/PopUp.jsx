import React,{useState} from 'react';
import {Button,Dialog,DialogActions,DialogContent,DialogTitle} from '@material-ui/core';
import "./PopUp.css";
const PopUp=()=>{
    const [open,setOpen]=useState(true);
    const handleClose=()=>{
        setOpen(false);
    }
    return(
        <div>
            <Dialog
            className="dialog"
            open={open}
            onClose={handleClose}
            scroll='paper'
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title"><div className="title"></div></DialogTitle> 
                <DialogContent dividers>
                    <div id="scroll-dialog-description" style={{fontFamily:"'Rajdhani', sans-serif",color:"#002244"}}>
                            You must've heard of many Pathfinding Algorithms but Do you know how some of them work?
                            Here, you can visualise how some famous pathfinding algorithms works and finds the path from <i>Source</i> to <i>Destination</i>.
                            <br></br>
                            <br></br>
                            <h5>Implmented Pathfinding Algorithms</h5>
                            <ul>
                                <li style={{color:"#d92027"}}>A* Search</li>
                                <li style={{color:"#d92027"}}>Dijkstra's Search</li>
                                <li style={{color:"#d92027"}}>Breadth First Search</li>
                                <li style={{color:"#d92027"}}>Bi-directional Breadth First Search</li>
                                <li style={{color:"#d92027"}}>Depth First Search</li>
                            </ul>
                            You can also add some walls to block the path from Source to Destination and there is an option to generate different types of mazes on the board.
                            <br/><strong><i>Don't skip the Instructions part after this line. It can be a bit tricky to use it for first time</i></strong>
                            <br></br>
                            <br></br>
                            <h2>Instructions</h2><hr></hr>
                            <ul>
                                <li>The first time you click on any cell, it will be marked as <code>Source</code>.</li>
                                <li>The second click on any cell will mark it as <code>Destination</code>.</li>
                                <li>After marking Source and Destination, you can make walls by pressing the mouse button on any cell and then dragging it to other cells.</li>
                                <li>Once you are done with creating souce, destination and walls then choose the pathfinding algorithm from the top left dropdown list.</li>
                                <li>Click on the <strong>Visualize</strong><i> algorithm-name </i> to start the pathfinding process so that you can see how that works.</li>
                                <li>You can also generate mazes by selecting any maze from dropdown list on top right corner and then click on <strong>Generate Maze </strong>button.</li>
                                <li>Don't mark your source and destination before the maze is generated if you are planning to generate maze.</li>
                                <li>If you want to remove everything from board except Source and Destination then click on <strong>Previous Board </strong>button.</li>
                                <li>If want to reset the board to initial state then just click on <strong>Clear Board</strong> button.</li>
                            </ul>
                            <strong><i>All the cells in blue color are visited cells by the source and the path which source takes is shown by cells colored in Green color.</i></strong>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">Close</Button>
                </DialogActions>    
            </Dialog>
        </div>
    )
}
export default PopUp;