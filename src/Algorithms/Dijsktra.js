export function dijsktra(grid,startNode,finishNode){
  const visitedNodes=[];
    startNode.distance=0;
    const unVisitedNodes=getAllNodes(grid);
    //console.log(startNode);
    while(!!unVisitedNodes.length){
        sortByDistance(unVisitedNodes);
        const closestNode=unVisitedNodes.shift();
        if(closestNode.isWall===true) continue;
        if(closestNode.distance===Infinity) return visitedNodes;
        closestNode.isVisited=true;
        visitedNodes.push(closestNode);
        if(closestNode===finishNode) return visitedNodes;
        updateNeighbours(closestNode,grid);
    }
   // console.log("HERERER");
}
function sortByDistance(unVisitedNodes){
    unVisitedNodes.sort((nodeA,nodeB)=>nodeA.distance-nodeB.distance);
}
function updateNeighbours(closestNode,grid){
    const neighbors=getAllNeighbors(closestNode,grid);
    for(const neighbor of neighbors){
      neighbor.distance=closestNode.distance+1;
      neighbor.previousNode=closestNode;
    }
}
function getAllNeighbors(closestNode,grid){
    const neighbors=[];
    const{row,col}=closestNode;
    if(row>0) neighbors.push(grid[row-1][col]);
    if(row<grid.length-1) neighbors.push(grid[row+1][col]);
    if(col>0) neighbors.push(grid[row][col-1]);
    if(col<grid[0].length-1) neighbors.push(grid[row][col+1]);
    return neighbors.filter((neighbor)=>!neighbor.isVisited)
}
function getAllNodes(grid){
    const unVisitedNodes=[];
    for(const row of grid){
      for(const node of row){
          unVisitedNodes.push(node);
      }
    }
    return unVisitedNodes;
}
export function getNodesInShortestPathOrder(finishNode){
    const nodesInShortestPath=[];
    let currentNode=finishNode;
    while(currentNode!==null){
      nodesInShortestPath.unshift(currentNode);
      currentNode=currentNode.previousNode;
    }
    return nodesInShortestPath;
}