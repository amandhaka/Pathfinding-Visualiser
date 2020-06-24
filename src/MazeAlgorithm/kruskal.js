export const kruskal=(grid)=>{
    const unVisitedNodes=getAllNodes(grid);
    addNewProperty(unVisitedNodes);
    const walls=[];
    console.log(unVisitedNodes);
    while(!!unVisitedNodes.length){
        let idx=Math.floor(Math.random()*unVisitedNodes.length);
        const currentNode=unVisitedNodes[idx];
        currentNode.isNeighborVisited=true;
        //console.log(currentNode);
        const neighbors=getAllNeighbors(currentNode,grid);
        const neighborNode=neighbors[Math.floor(Math.random()*neighbors.length)];
        const neighborNode1=neighbors[Math.floor(Math.random()*neighbors.length)];
        
        if(!neighborNode.isNeighborVisited) neighborNode.isWall=true;
        if(!neighborNode1.isNeighborVisited) neighborNode1.isWall=true;
        currentNode.isWall=true;
       
        if(!neighborNode.isNeighborVisited) walls.push(neighborNode);
        if(!neighborNode1.isNeighborVisited) walls.push(neighborNode1);
        walls.push(currentNode);
        
        for(const neighbor of neighbors){
            let tempIdx=unVisitedNodes.indexOf(neighbor);
            neighbor.isNeighborVisited=true;
            unVisitedNodes.splice(tempIdx,1);
        }
        unVisitedNodes.splice(idx,1);
    }
    console.log(unVisitedNodes);
    return walls;
}
const getAllNeighbors=(currentNode,grid)=>{
    const neighbors=[];
    const {row,col}=currentNode;
    if(row>0) neighbors.push(grid[row-1][col]);
    if(row<grid.length-1) neighbors.push(grid[row+1][col]);
    if(col>0) neighbors.push(grid[row][col-1]);
    if(col<grid[0].length-1) neighbors.push(grid[row][col+1]);
    if(row>0 && col>0) neighbors.push(grid[row-1][col-1]);
    if(row<grid.length-1 && col>0) neighbors.push(grid[row+1][col-1]);
    if(row<grid.length-1 && col<grid[0].length-1) neighbors.push(grid[row+1][col+1]);
    if(row>0 && col<grid[0].length-1) neighbors.push(grid[row-1][col+1]);
    return neighbors;
}
const addNewProperty=(unVisitedNodes)=>{
    for(const node of unVisitedNodes){
        node.isNeighborVisited=false
    }
}
const getAllNodes=(grid)=>{
    const nodes=[];
    for(const row of grid){
        for(const node of row){
            nodes.push(node);
        }
    }
    return nodes;
}