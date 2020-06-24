export const recursiveDivision=(grid)=>{
    const visitedNodes=[];
    const height=grid.length;
    const width=grid[0].length;
    //console.log(grid[height]);
    for(let i=0;i<height;i++){
        const tempNode=grid[i][0],tempNode1=grid[i][width-1];
        tempNode.isWall=true;
        tempNode1.isWall=true;
        visitedNodes.push(tempNode);
        visitedNodes.push(tempNode1);
    }
    for(let i=0;i<width;i++){
        const tempNode=grid[0][i],tempNode1=grid[height-1][i];
        tempNode.isWall=true;
        tempNode1.isWall=true;
        visitedNodes.push(tempNode);
        visitedNodes.push(tempNode1);
    }
    recursiveDivisionMaze(grid,visitedNodes,1,height-2,1,width-2);
    return visitedNodes;
}
function recursiveDivisionMaze(grid,visitedNodes,startX,endX,startY,endY){
    const height=endX-startX+1;
    const width=endY-startY+1;
    if(height<3 || width<3){
        return;
    }
    if (startX < 0 || startY < 0 || endX >= grid.length || endY >= grid[0].length || startX > endX || startY > endY)
        return;

    const hOrV=getOrientation(height,width);
    if(hOrV==='Horizontal'){
        const wallX=getRandomInt(startX+1,endX-1);
        const skipY=getRandomInt(startY+1,endY-1);
        //const skipY1=getRandomInt(startY,endY);
        for(let wallY=startY;wallY<=endY;wallY++){
            if(wallY===skipY ){
                // const temp=grid[wallX][skipY];
                // const {row,col}=temp;
                // const newNode={
                //     ...temp,
                //     isPath:true,
                // }
                // grid[row][col]=newNode;
                continue;
            }
            // if(grid[wallX-1][wallY].isPath || grid[wallX+1][wallY].isPath || grid[wallX][wallY-1].isPath || grid[wallX][wallY+1].isPath) continue;
            const node=grid[wallX][wallY];
            node.isWall=true;
            visitedNodes.push(node);
        }
        recursiveDivisionMaze(grid,visitedNodes,startX,wallX-1,startY,endY);
        recursiveDivisionMaze(grid,visitedNodes,wallX+1,endX,startY,endY);
}
    else if(hOrV==='Vertical'){
        const wallY=getRandomInt(startY+1,endY-1);
        const skipX=getRandomInt(startX+1,endX-1);
        //const skipX1=getRandomInt(startX,endX);
        for(let wallX=startX;wallX<=endX;wallX++){
            if(wallX===skipX){
                // const temp=grid[wallX][wallY];
                // const{row,col}=temp;
                // const newNode={
                //     ...temp,
                //     isPath:true,
                // }
                // grid[row][col]=newNode;
                continue;
            }
            // if(grid[wallX][wallY-1].isPath || grid[wallX][wallY+1].isPath || grid[wallX-1][wallY].isPath || grid[wallX+1][wallY].isPath) continue;
            //if(!grid[wallX+1][wallY].isWall) continue;
            const node=grid[wallX][wallY];
            node.isWall=true;
            visitedNodes.push(node);
        }
        recursiveDivisionMaze(grid,visitedNodes,startX,endX,startY,wallY-1);
        recursiveDivisionMaze(grid,visitedNodes,startX,endX,wallY+1,endY);
    }
}
const getRandomInt=(min,max)=>{
    max = max + 1;
    return Math.floor(Math.random() * (max - min)) + min;
}
function getOrientation(height,width){
    if(height>width){
        return "Horizontal";
    }
    else if(height<width){
        return "Vertical";
    }
    else{
        const i=(Math.random()*1);
        if(i===1) return "Vertical";
        else return "Horizontal";
    }
}