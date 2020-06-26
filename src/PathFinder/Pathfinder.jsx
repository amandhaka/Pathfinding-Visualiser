import React, { useState, useEffect } from "react";
import style from "./Pathfinder.module.css";
import Node from "./Node";
import cover from "../icons/cover.png"
import {
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  ButtonGroup
} from "@material-ui/core";
import {
  dijsktra,
  getNodesInShortestPathOrder,
} from "../Algorithms/Dijsktra";
import { dfs, getShortestPath } from "../Algorithms/DFS";
import { bfs, getNodesInShortestPath } from "../Algorithms/BFS";
import { astar, getNodesInShortestPathAstar } from "../Algorithms/Astar";
import { dfsMaze } from "../MazeAlgorithm/dfsmaze";
import { recursiveDivision } from "../MazeAlgorithm/RecursiveDivision";
import { kruskal } from "../MazeAlgorithm/kruskal";
import { biBfs, getNodesInShortestPathBiBfs } from "../Algorithms/BiBfs";

const ROWS=window.innerHeight;
const COLS=window.innerWidth;

const PathFinder = () => {
  const [grid, setGrid] = useState([]);
  const [mouseIsPressed, setMousePress] = useState(false);
  const [startNode, setStartNode] = useState(true);
  const [endNode, setEndNode] = useState(false);
  const [startRow, setStartRow] = useState(-1);
  const [startCol, setStartCol] = useState(-1);
  const [finishRow, setFinishRow] = useState(-1);
  const [finishCol, setFinishCol] = useState(-1);
  
  useEffect(() => {
    const newGrid = getIntialGrid();
    setGrid(newGrid);
  }, []);
  const createNode = (col, row) => {
    return {
      col,
      row,
      isStart: false,
      isFinish: false,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      previousNode: null,
    };
  };
  const getIntialGrid = () => {
    const newGrid = [];
    for (let row = 0; row < Math.floor(ROWS/29); row++) {
      const currentRow = [];
      for (let col = 0; col < Math.floor(COLS/25); col++) {
        currentRow.push(createNode(col, row));
      }
      newGrid.push(currentRow);
    }
    //console.log(newGrid.length,newGrid[0].length);
    return newGrid;
  };
  const findDijkstraPath = () => {
    // console.log(startRow,startCol);
    // console.log(finishRow,finishCol);
    const startNode = grid[startRow][startCol];
    const finishNode = grid[finishRow][finishCol];
    // console.log(startNode,startNode);
    // console.log(finishNode,finishNode);
    const visitedNodes = dijsktra(grid, startNode, finishNode);
    //console.log(visitedNodes);
    // console.log(visitedNodes);
    const nodesInShortestPath = getNodesInShortestPathOrder(finishNode);
    animatePath(visitedNodes, nodesInShortestPath);
  };
  const findDfs = () => {
    const startNode = grid[startRow][startCol];
    const finishNode = grid[finishRow][finishCol];
    const visitedNodes = dfs(grid, startNode, finishNode);
    //console.log(visitedNodes);
    const nodesInShortestPath = getShortestPath(finishNode);
    animatePath(visitedNodes, nodesInShortestPath);
  };
  const findAstar = () => {
    const startNode = grid[startRow][startCol];
    const finishNode = grid[finishRow][finishCol];
    //console.log(finishNode);
    const visitedNodes = astar(grid, startNode, finishNode);
    const nodesInShortestPath = getNodesInShortestPathAstar(finishNode);
    animatePath(visitedNodes, nodesInShortestPath);
  };

  const findBfs = () => {
    const startNode = grid[startRow][startCol];
    const finishNode = grid[finishRow][finishCol];
    const visitedNodes = bfs(grid, startNode, finishNode);
    // console.log(visitedNodes);
    const nodesInShortestPath = getNodesInShortestPath(finishNode);
    console.log(visitedNodes);
    //console.log(nodesInShortestPath);
    // const nodesInShortestPath=[];
    animatePath(visitedNodes, nodesInShortestPath);
  };

  const bidirectionalBFS = () => {
    const startNode = grid[startRow][startCol];
    const finishNode = grid[finishRow][finishCol];
    const [visitedNodes, midFromStart, midFromEnd] = biBfs(
      grid,
      startNode,
      finishNode
    );
    // console.log(visitedNodes);
    const nodesInShortestPath = getNodesInShortestPathBiBfs(
      midFromStart,
      midFromEnd
    );
    animatePath(visitedNodes, nodesInShortestPath);
  };
  const dfsRecursiveMaze = () => {
    const startX = Math.floor(Math.random() * grid.length);
    const startY = Math.floor(Math.random() * grid[0].length);
    //console.log(grid);
    const walls = dfsMaze(grid, startX, startY);
    //console.log(grid);
    for (let i = 0; i < walls.length; i++) {
      const { row, col } = walls[i];
      setTimeout(() => {
        document.getElementById(`node-${row}-${col}`).className =
          "node node-wall1";
      }, i * 10);
    }
    setTimeout(() => {
      const newGrid = toggleVisitedAfterMaze(grid, walls);
      setGrid(newGrid);
    }, walls.length * 10);
  };
  const recursiveMaze = () => {
    //console.log(grid);
    //const walls=[];
    const walls = recursiveDivision(grid);
    for (let i = 0; i < walls.length; i++) {
      setTimeout(() => {
        const { row, col } = walls[i];
        document.getElementById(`node-${row}-${col}`).className =
          "node node-wall1";
      }, i * 10);
    }
  };
  const kruskalMaze = () => {
    const walls = kruskal(grid);
    //console.log(walls);
    for (let i = 0; i < walls.length; i++) {
      setTimeout(() => {
        const { row, col } = walls[i];
        document.getElementById(`node-${row}-${col}`).className =
          "node node-wall1";
      }, i * 10);
    }
  };
  /*
  Note: Timing in setTimeout is for individual node that after i*10 seconds we change the property of other node and so on.
  As setTimeout is Ayscn function and it will not wait for current node to change color and it will move to next and then next
  so after the specifeid time every node will change color suddenly.
  */
  const animatePath = (visitedNodes, nodesInShortestPath) => {
    for (let i = 0; i <= visitedNodes.length; i++) {
      if (i === visitedNodes.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPath);
        }, 10 * i); //we are multiplyinng by i so that for ith node we wait i*10 seconds otherwise all animations will overlap
        return;
      }
      setTimeout(() => {
        const node = visitedNodes[i];
        if(!node.isStart && !node.isFinish)
          document.getElementById(`node-${node.row}-${node.col}`).className ="node node-visited";
        if(node.isStart)
          document.getElementById(`node-${node.row}-${node.col}`).className="node node-start-visited";
        if(node.isFinish)
          document.getElementById(`node-${node.row}-${node.col}`).className="node node-finish-visited";
      }, 10 * i);
    }
  };
  const animateShortestPath = (nodesInShortestPath) => {
    for (let i = 0; i < nodesInShortestPath.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPath[i];
        if(!node.isStart && !node.isFinish)
          document.getElementById(`node-${node.row}-${node.col}`).className ="node node-shortest-path";
        if(node.isStart)
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-start-shortest-path";
        if(node.isFinish)
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-finish-shortest-path";
      }, 10 * i);
    }
  };
  const setStartAndEndNode = (row, col) => {
    if (startNode) {
      const newGrid = getNewGridwithStartNode(grid, row, col);
      setGrid(newGrid);
      setStartRow(row);
      setStartCol(col);
      setEndNode(true);
      setStartNode(false);
    } else if (endNode) {
      const newGrid = getNewGridWithEndNode(grid, row, col);
      setGrid(newGrid);
      setFinishRow(row);
      setFinishCol(col);
      setEndNode(false);
    }
  };
  function handleMouseDown(row, col) {
    // console.log("HandleMouseDowm");
    if (startNode || endNode) return;
    const newGrid = getNewGridWithWall(grid, row, col);
    setGrid(newGrid);
    setMousePress(true);
  }
  function handleMouseEnter(row, col) {
    //console.log("HandleMouseEnter");
    if (startNode || endNode) return;
    if (!mouseIsPressed) return;
    const newGrid = getNewGridWithWall(grid, row, col);
    setGrid(newGrid);
  }
  function onMouseUp() {
    if (startNode || endNode) return;
    //console.log("HandleMouseUp");
    setMousePress(false);
  }
  const clearBoard = () => {
    //console.log("Caled");
    setMousePress(false);
    setStartNode(true);
    setEndNode(false);
    setStartRow(-1);
    setStartCol(-1);
    setFinishRow(-1);
    setFinishCol(-1);
    const newGrid = [];
    for(let i=0;i<Math.floor(ROWS/29);i++){
      const currentRow=[];
      for(let j=0;j<Math.floor(COLS/25);j++){
        currentRow.push(createNode(j,i));
      }
      newGrid.push(currentRow);
    }
    setGrid(newGrid)
    for (const row of newGrid) {
      for (const node of row) {
        document.getElementById(`node-${node.row}-${node.col}`).className ="node";
      }
    }
  };
  const getPreviousBoard = () => {
    const newGrid=[];
    for(let row=0;row<Math.floor(ROWS/29);row++){
      const currentRow=[];
      for(let col=0;col<Math.floor(COLS/25);col++){
        const newNode={
          col,
          row,
          isStart:row===startRow&& col===startCol,
          isFinish:row===finishRow && col===finishCol,
          previousNode:null,
          distance:Infinity,
          isVisited:false,
          isWall:false,
        }
        currentRow.push(newNode);
      }
      newGrid.push(currentRow);
    }
    for (const row of newGrid) {
      for (const node of row) {
        if (!node.isStart && !node.isFinish)
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node";
        if (!node.isStart && !node.isFinish)
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node";
        if (node.isStart)
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-start";
        if (node.isFinish)
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-finish";
      }
    }
    setGrid(newGrid);
  };
  const visualizeAlgorithm = () => {
    if (algorithm === "A* Search") {
      findAstar();
    } else if (algorithm === "Dijkstra Search") {
      findDijkstraPath();
    } else if (algorithm === "Bi-directional BFS") {
      bidirectionalBFS();
    } else if (algorithm === "Breadth First Search") {
      findBfs();
    } else if (algorithm === "Depth First Search") {
      findDfs();
    }
  };
  const visualizeMaze = () => {
    if (maze === "Recursive Division Maze") {
      recursiveMaze();
    } else if (maze === "DFS Recursive Maze") {
      dfsRecursiveMaze();
    } else if (maze === "Random Walls") {
      kruskalMaze();
    }
  };
  const [algorithm, setAlgorithm] = useState("");
  const [maze, setMaze] = useState("");
  return (
    <div className={style.container}>
      <div className={style.nav}>
        <img src={cover} alt="Missing" width="50px" height="40px" className={style.image}></img>
        <FormControl variant={COLS<20?"filled":"outlined"} centered className={style.formControl}>
          <InputLabel id="alogrithm-selector">
            <Typography color="secondary" style={{fontFamily:"'Vollkorn', serif"}} className={style.labelText} align="center" display="inline">
              Choose Pathfinding Algorithm
            </Typography>
          </InputLabel>
          <Select
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
            labelId="algorithm-selector"
          >
            <MenuItem value={"A* Search"}>
              <Typography color="secondary">A* Search</Typography>
            </MenuItem>
            <MenuItem value={"Dijkstra Search"}>
              <Typography color="secondary">Dijkstra Search</Typography>
            </MenuItem>
            <MenuItem value={"Bi-directional BFS"}>
              <Typography color="secondary">Bi-directional BFS</Typography>
            </MenuItem>
            <MenuItem value={"Breadth First Search"}>
              <Typography color="secondary">Breadth First Search</Typography>
            </MenuItem>
            <MenuItem value={"Depth First Search"}>
              <Typography color="secondary">Depth First Search</Typography>
            </MenuItem>
          </Select>
        </FormControl>
        <div className="button-group">
        <Button
          color="secondary"
          variant="outlined"
          onClick={() => visualizeAlgorithm()}
          className={style.button}
        >
          <Typography variant="body2" className={style.buttonText}>
            Visualise {algorithm}
          </Typography>
        </Button>
        <Button
          color="secondary"
          variant="outlined"
          onClick={() => getPreviousBoard()}
          className={style.button}
        >
          <Typography variant="body2" className={style.buttonText}>
            Previous Board
          </Typography>
        </Button>
        <Button
          color="secondary"
          variant="outlined"
          onClick={() => clearBoard()}
          className={style.button}
        >
          <Typography variant="body2" className={style.buttonText}>
            Clear Board
          </Typography>
        </Button>
        <Button
          color="secondary"
          variant="outlined"
          onClick={() => visualizeMaze()}
          className={style.button}
        >
          <Typography variant="body2" className={style.buttonText}>
            Visualise Maze
          </Typography>
        </Button>
        </div>
        <FormControl variant={COLS<20?"filled":"outlined"} className={style.formControl}>
          <InputLabel id="maze-selector">
            <Typography color="secondary" align="center" className={style.labelText} style={{fontFamily: "'Vollkorn', serif"}}>
              Generate Mazes
            </Typography>
          </InputLabel>
          <Select
            value={maze}
            onChange={(e) => setMaze(e.target.value)}
            labelId="maze-selector"
          >
            <MenuItem value={"Recursive Division Maze"}>
              <Typography color="secondary">Recusive Divison Maze</Typography>
            </MenuItem>
            <MenuItem value={"DFS Recursive Maze"}>
              <Typography color="secondary">DFS Recurive Maze</Typography>
            </MenuItem>
            <MenuItem value={"Random Walls"}>
              <Typography color="secondary">Random Walls</Typography>
            </MenuItem>
          </Select>
        </FormControl>
      </div>
      <div id="grid" className={style.grid}>
        {grid.map((row, rowIdx) => {
          return (
            <div key={rowIdx}>
              {row.map((node, nodeIdx) => {
                return (
                  <Node
                    key={nodeIdx}
                    isStart={node.isStart}
                    isFinish={node.isFinish}
                    isVisited={node.isVisited}
                    isWall={node.isWall}
                    row={node.row}
                    col={node.col}
                    onMouseClick={(row, col) => setStartAndEndNode(row, col)}
                    onMouseUp={() => onMouseUp()}
                    onMouseDown={(row, col) => handleMouseDown(row, col)}
                    onMouseEnter={(row, col) => handleMouseEnter(row, col)}
                  ></Node>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};
const toggleVisitedAfterMaze = (grid, walls) => {
  const newGrid = grid.slice();
  for (let i = 0; i < walls.length; i++) {
    const { row, col } = walls[i];
    const node = walls[i];
    const newNode = {
      ...node,
      isVisited: false,
    };
    newGrid[row][col] = newNode;
  }
  return newGrid;
};
const getNewGridwithStartNode = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: false,
    isStart: true,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};
const getNewGridWithEndNode = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: false,
    isFinish: true,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};
const getNewGridWithWall = (grid, row, col) => {
  //console.log("Calledd");
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};
export default PathFinder;
