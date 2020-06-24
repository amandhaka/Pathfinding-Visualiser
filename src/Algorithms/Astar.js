export const astar=(grid,startNode,finishNode)=>{
    const visitedNodes=[];
    const unVisitedNodes=getAllNodes(grid);
   // console.log(unVisitedNodes,finishNode);
    calculateGFH(unVisitedNodes,finishNode); // this function will caculate f,g,h distance. f=total distance(g+h). h is heuristic distance from final node to current node. g is distance of starting to current
    startNode.g=0;
    startNode.f=startNode.g;
    while(!!unVisitedNodes.length){
        sortByDistance(unVisitedNodes);
        const closestNode=unVisitedNodes.shift();
        if(closestNode.isWall) continue;
        if(closestNode.f===Infinity) return visitedNodes;
        closestNode.isVisited=true;
        visitedNodes.push(closestNode);
        if(closestNode===finishNode) return visitedNodes;
        updateNeighbours(grid,closestNode);     
    }
}
const updateNeighbours=(grid,closestNode)=>{
    const neighbors=getAllNeighbors(grid,closestNode);
    for(const neighbor of neighbors){
        if(neighbor.g<closestNode.g+1) continue;
        if(neighbor.isVisited) continue;
        neighbor.g=closestNode.g+1;
        neighbor.f=neighbor.h+neighbor.g;
        neighbor.previousNode=closestNode;
    }
}
const getAllNeighbors=(grid,closestNode)=>{
    const {row,col}=closestNode;
    const neighbors=[];
    if(row>0) neighbors.push(grid[row-1][col]);
    if(row<grid.length-1) neighbors.push(grid[row+1][col]);
    if(col>0) neighbors.push(grid[row][col-1]);
    if(col<grid[0].length-1) neighbors.push(grid[row][col+1]);
    return neighbors;
}
const sortByDistance=(unVisitedNodes)=>{
    unVisitedNodes.sort((nodeA,nodeB)=>nodeA.f-nodeB.f);
}
const calculateGFH=(unVisitedNodes,finishNode)=>{
    for(const node of unVisitedNodes){
        node.f=Infinity;
        node.g=Infinity;
        node.h=heuristicManhattanDistance(node,finishNode);
    }
}

const heuristicManhattanDistance=(node,finishNode)=>{
    return Math.abs(node.row-finishNode.row)+Math.abs(node.col-finishNode.col);
}
const getAllNodes=(grid)=>{
    const unvisitedNodes=[];
    for(const row of grid){
        for(const node of row){
            unvisitedNodes.push(node);
        }
    }
    return unvisitedNodes;
}
export const getNodesInShortestPathAstar=(finishNode)=>{
    let currentNode=finishNode;
    const shortestPath=[];
    while(currentNode!=null){
        shortestPath.unshift(currentNode);
        currentNode=currentNode.previousNode;
    }
    return shortestPath;
}