const stackChild=[];
export const dfsMaze=(grid,startX,startY)=>{
    const startNode=grid[startX][startY];
    startNode.isVisited=true;
    startNode.isWall=true;
    const visitedNodes=[];
    visitedNodes.push(startNode);
    dfsMazeRecursive(grid,startX,startY,visitedNodes);
    return visitedNodes;
}
const dfsMazeRecursive=(grid,x,y,visitedNodes)=>{
    const node=grid[x][y];
    const array=[0,1,2,3];
    for(let i=array.length-1;i>0;i--){
        const j=Math.floor(Math.random()*(i-1));
        [array[i],array[j]]=[array[j],array[i]];
    }
    //console.log(array);
    const sideNodesX1=[0,0,1,-1];
    const sideNodesY1=[1,-1,0,0];
    const sideNodesX2=[0,0,2,-2];
    const sideNodesY2=[2,-2,0,0];
    for(let k=0;k<=3;k++){
        const i=array[k];
        const {col,row}=node;
        const newX2=row+sideNodesX2[i];
        const newY2=col+sideNodesY2[i];
        if(!(newX2>=0 && newY2>=0 && newX2<grid.length && newY2<grid[0].length)) continue;
        const neighbor=grid[newX2][newY2];
        if(neighbor.isVisited===true || neighbor.isWall===true) continue;
        const newX1=row+sideNodesX1[i];
        const newY1=col+sideNodesY1[i];
        if((newX2>=0 && newY2>=0 && newX2<grid.length && newY2<grid[0].length)){
            grid[newX1][newY1].isWall=true;
            grid[newX1][newY1].isVisited=true;
            visitedNodes.push(grid[newX1][newY1]);
        }
        stackChild.push({'x':newX2,'y':newY2});
        //stackChild.push({'x':newX1,'y':newY2});
        const childNode=grid[newX2][newY2];
        childNode.isVisited=true;
        childNode.isWall=true;
        visitedNodes.push(grid[newX2][newY2]);
    }
    while(stackChild.length!==0){
        const node=stackChild.pop();
        // console.log(stackChild);
        // console.log(node);
        dfsMazeRecursive(grid,node['x'],node['y'],visitedNodes);
    }
}