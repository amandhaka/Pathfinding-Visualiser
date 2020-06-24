export const prims=(grid,x,y)=>{
    const startNode=grid[x][y];
    const unVisitedNodes=getAllNodes(grid);
    updateNeighborNodeProperty(unVisitedNodes);
    startNode.mazeDistance=0;
    const walls=[];
    while(!!unVisitedNodes.length){
        sortByDistance(unVisitedNodes);
        const currentNode=unVisitedNodes.shift();
        if(currentNode.mazeDistance===Infinity) continue;
        if(currentNode.isWall) continue;
        const neighbors=getNeighbors(currentNode,grid);
        let idx=Math.floor(Math.random()*neighbors.length);
        let idx1=Math.floor(Math.random()*neighbors.length);
        const neighborNode=neighbors[idx];
        const neighborNode1=neighbors[idx1];
        neighborNode.mazeDistance=currentNode.mazeDistance+1;
        neighborNode1.mazeDistance=currentNode.mazeDistance+2;
        walls.push(currentNode);
        currentNode.isWall=true;
    }
    return walls;
}
const sortByDistance=(unVisitedNodes)=>{
    unVisitedNodes.sort((A,B)=>A.mazeDistance-B.mazeDistance);
}
const getNeighbors=(currentNode,grid)=>{
    const {row,col}=currentNode;
    const neighbors=[];
    if(row>0) neighbors.push(grid[row-1][col]);
    if(row<grid.length-1) neighbors.push(grid[row+1][col]);
    if(col>0) neighbors.push(grid[row][col-1]);
    if(col<grid[0].length-1) neighbors.push(grid[row][col+1]);
    return neighbors;
}
const getAllNodes=(grid)=>{
    const unVisitedNodes=[];
    for(const row of grid){
        for(const node of row){
            unVisitedNodes.push(node);
        }
    }
    return unVisitedNodes;
};
const updateNeighborNodeProperty=(unVistedNodes)=>{
    for(const node of unVistedNodes){
        node.mazeDistance=Infinity;
    }
}