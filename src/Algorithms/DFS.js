export const dfs=(grid,startNode,finishNode)=>{
    const visitedNodes=[];
    const unVisitedNodes=getAllNode(grid);
    startNode.distance=0;
    helper(visitedNodes,unVisitedNodes,grid,startNode,finishNode,null);
    return visitedNodes;
}
const helper=(visitedNodes,unVisitedNodes,grid,currentNode,finishNode,previous)=>{
    if(finishNode.isVisited) return;
    if(currentNode===finishNode){
        finishNode.previousNode=previous;
        finishNode.isVisited=true;
        return;
    }
    if(currentNode.distance===Infinity) return;
    if(currentNode.isVisited) return;
    if(currentNode.isWall) return;
    visitedNodes.push(currentNode);
    currentNode.isVisited=true;
    currentNode.previousNode=previous;
    const{row,col}=currentNode;
    if(row>0) {
        const nextNode=grid[row-1][col];
        nextNode.distance=currentNode.distance+1;
        helper(visitedNodes,unVisitedNodes,grid,grid[row-1][col],finishNode,currentNode);
    }
    if(col<grid[0].length-1) {
        const nextNode=grid[row][col+1];
        nextNode.distance=currentNode.distance+1;
        helper(visitedNodes,unVisitedNodes,grid,grid[row][col+1],finishNode,currentNode);
    }
    if(row<grid.length-1) {
        const nextNode=grid[row+1][col];
        nextNode.distance=currentNode.distance+1;
        helper(visitedNodes,unVisitedNodes,grid,grid[row+1][col],finishNode,currentNode);
    }
    if(col>0) {
        const nextNode=grid[row][col-1];
        nextNode.distance=currentNode.distance+1;
        helper(visitedNodes,unVisitedNodes,grid,grid[row][col-1],finishNode,currentNode);
    }
}
const getAllNode = (grid) => {
    const unVisitedNodes=[];
    for(const nodes of grid){
        for(const node of nodes){
            unVisitedNodes.push(node);
        }
    }
    return unVisitedNodes;
}
export const getShortestPath=(finishNode)=>{
    let currentNode=finishNode;
    const nodes=[];
    while(currentNode!==null){
        nodes.unshift(currentNode);
        currentNode=currentNode.previousNode;
    }
    return nodes;
}