import React, { Component } from 'react';
import {Button,Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
class PopUp extends Component {
    constructor(props){
        super(props);
        this.state={
            modal:true,
        }
    }
    toggle() 
        {
            this.setState({modal:!this.state.modal});
        }
    render() {
        let styles={
            position:"absolute",
            textAlign:"center",
            left:"50%",
            top:"50%",
            transform:"translate(-50%,-50%)",
        }
        return ( 
            <div stye={{width:"100px"}}>
                <Modal style={styles} toggle={()=>this.toggle()} isOpen={this.state.modal} width="400px">
                    <ModalHeader style={{fontFamily: "'Anton', sans-serif",fontWeight:'900'}}>Pathfinding Visualizer</ModalHeader>
                    <ModalBody style={{fontFamily:"'Rajdhani', sans-serif"}}>
                        Hey!<br></br>
                        This is a Path finding Visualizer.
                        You can Visualize how different pathfinding algorithms work to find path between source and destination.
                        <h2>Instructions:</h2>
                        <ul>
                            <li><code>Source</code> First of all, Select any cell and mark it as source by click on it.</li>
                            <li><code>Destination</code> After marking your source, Select any cell and mark it as destination.</li>
                            <li>Drawing a wall can be a bit tricky for first time, just click on a cell from where you want to start the wall and then keep dragging it to other cells to expand that wall without lifting the mouse and if you want to make just one cell as wall then just click on it once.</li>
                            <li>Choose one of the pathfinding algorithms from the dropdown list</li>
                            <li>Click on Visualize (<i>Algorithm Name</i>) to start the algorithm and find the path from source to destination</li>
                            <li>You can also generate maze of different types by selecting any maze from dropdown list. <strong>Mark your source and destination after the maze generation finishes</strong></li>
                            <li>If you click on "Previous board", everything from the board will be removed except Source and destination</li>
                            <li>If you want to reset the board to initial state, Click on "Clear Board"</li>
                        </ul>
                        <strong><i>DON'T CLICK ON ANY BUTTON IF PATHFINDING ALGORITHM IS IN PROCESS</i></strong>               
                        <br></br>
                        <strong>Thank You</strong>
                    </ModalBody>
                    <ModalFooter>
                    <Button onClick={()=>this.toggle()} color="danger" style={{width:'60px',right:'0',textAlign:'center'}}>Close</Button>
                    </ModalFooter>
                </Modal>
            </div>
         );
    }
}
 
export default PopUp;