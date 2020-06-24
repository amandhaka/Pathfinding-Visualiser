export const biBfs=(grid,startNode,finishNode)=>{
    const visitedNodes1=[];
    const visitedNodes2=[];
    const visitedNodes=[];
    const q1=[];
    const q2=[];
    startNode.distance=0;
    finishNode.distance=0;
    q1.push(startNode);
    q2.push(finishNode);
    while(!!q1.length && !!q2.length){
        const fromStart=q1.shift();
        const fromEnd=q2.shift();
        if(fromStart.distance===Infinity || fromEnd.distance===Infinity) return visitedNodes;
        if(!fromStart.isWall){
            const neighbors=getAllNeighbors(grid,fromStart);
            for(const neighbor of neighbors){
                if(visitedNodes2.includes(neighbor)){
                    //visitedNodes.push(neighbor);
                    //midNodeFromStart=neighbor;
                    visitedNodes.push(fromStart);
                    fromStart.isVisited=true;
                    neighbor.nextNode=fromStart;
                    return [visitedNodes,neighbor,neighbor.nextNode];
                }
                if(neighbor.isVisited) continue;
                neighbor.isVisited=true;
                neighbor.previousNode=fromStart;
                neighbor.distance=fromStart.distance+1;
                q1.push(neighbor);
            }
            fromStart.isVisited=true;
            visitedNodes1.push(fromStart);
            visitedNodes.push(fromStart);
        }
        if(!fromEnd.isWall){
            const neighbors=getAllNeighbors(grid,fromEnd);
            for(const neighbor of neighbors){
                if(visitedNodes1.includes(neighbor)){
                   // visitedNodes.push(neighbor);
                    visitedNodes.push(fromEnd);
                    fromEnd.isVisited=true;
                    neighbor.nextNode=fromEnd;
                    return [visitedNodes,neighbor,neighbor.nextNode];
                }
                if(neighbor.isVisited) continue;
                neighbor.isVisited=true;
                neighbor.previousNode=fromEnd;
                neighbor.distance=fromEnd.distance+1;
                q2.push(neighbor);
            }
            fromEnd.isVisited=true;
            visitedNodes2.push(fromEnd);
            visitedNodes.push(fromEnd);
        }
        
        if(visitedNodes1.includes(fromEnd) || visitedNodes2.includes(fromStart)){
            return visitedNodes;
        }
    }
    return [visitedNodes,null,null];
}

const getAllNeighbors=(grid,node)=>{
    const {row,col}=node;
    const neighbors=[];
    if(row>0) neighbors.push(grid[row-1][col]);
    if(row<grid.length-1) neighbors.push(grid[row+1][col]);
    if(col>0) neighbors.push(grid[row][col-1]);
    if(col<grid[0].length-1) neighbors.push(grid[row][col+1]);
    return neighbors;
}
export const getNodesInShortestPathBiBfs=(midNodeFromStart,midNodeFromEnd)=>{
    const nodesInShortestPath=[];
    let currentNode=midNodeFromEnd;
    while(currentNode!==null){
        nodesInShortestPath.unshift(currentNode);
        currentNode=currentNode.previousNode;
    }
    currentNode=midNodeFromStart;
    while(currentNode!=null){
        nodesInShortestPath.unshift(currentNode);
        currentNode=currentNode.previousNode;
    }
    return nodesInShortestPath;
}