export const bfs=(grid,startNode,finishNode)=>{
    const visitedNodes=[];
    //const unVisitedNodes=getAllNodes(grid);
    let queue=[];
    startNode.distance=0;
    queue.push(startNode);
    //console.log(startNode);
    while(!!queue.length){
        let currentNode=queue.shift();
        if(currentNode.isWall) continue; 
        if(currentNode.distance===Infinity) {
        //     console.log('infi');
            return visitedNodes;
         }
        if(currentNode===finishNode){ 
            visitedNodes.push(currentNode);
            return visitedNodes;
        }
        visitedNodes.push(currentNode);
        currentNode.isVisited=true;
        const {row,col} = currentNode;
        
        if(row>0){
            let nextNode=grid[row-1][col];
            if(!nextNode.isVisited && !queue.includes(nextNode))
            {
                nextNode.distance=currentNode.distance+1;
                nextNode.previousNode=currentNode;
                queue.push(nextNode);
            }
        }
        if(col>0){
            let nextNode=grid[row][col-1];
            if(!nextNode.isVisited && !queue.includes(nextNode))
           {
                nextNode.distance=currentNode.distance+1;
                nextNode.previousNode=currentNode;
                queue.push(nextNode);
            }
        }
        if(row<grid.length-1){
            let nextNode=grid[row+1][col];
            if(!nextNode.isVisited && !queue.includes(nextNode))
           {
                nextNode.distance=currentNode.distance+1;
                nextNode.previousNode=currentNode;
                queue.push(nextNode);
            }
        }
        if(col<grid[0].length-1){
            let nextNode=grid[row][col+1];
            if(!nextNode.isVisited && !queue.includes(nextNode))
            {
                nextNode.distance=currentNode.distance+1;
                nextNode.previousNode=currentNode;
                queue.push(nextNode);
            }
        }
    }
    return visitedNodes;
}
export const getNodesInShortestPath=(finishNode)=>{
    let currentNode=finishNode;
    let shortestPathNodes=[];
    while(currentNode!=null){
        shortestPathNodes.unshift(currentNode);
        currentNode=currentNode.previousNode;
    }
    return shortestPathNodes;
}
