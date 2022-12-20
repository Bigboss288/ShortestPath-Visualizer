import priorityQueue from "priorityqueuejs"

export function dijkstra(grid,startNode,endNode){
    const visitedNode = [];

    var nodesVisit = new priorityQueue((a,b) => b.distance - a.distance)


    startNode.distance = 0;
    nodesVisit.enq({ row: startNode.row , col: startNode.col, distance: 0});

    while(nodesVisit.size() > 0){
        const {row ,col, distance} = nodesVisit.deq();
        let currentNode = grid[row][col]

        if(distance > grid[row][col].distance) continue;
        currentNode.isVisited = true;
        visitedNode.push(currentNode)

        if(currentNode === endNode) return visitedNode;
        const dx = [1, -1, 0, 0];
        const dy = [0, 0, 1, -1];

        for(let i=0;i<4;i++){
            let x = dx[i] + row;
            let y = dy[i] + col;

            if(x>=0 && y>=0 && x<grid.length && y<grid[0].length 
                && !grid[x][y].isVisited && !grid[x][y].isWall){

                let neighbor = grid[x][y]
                if (neighbor.distance > currentNode.distance + neighbor.weight + 1) {
                    neighbor.distance = currentNode.distance + neighbor.weight + 1;
            
                    neighbor.previousNode = currentNode;
                    nodesVisit.enq({
                      row: neighbor.row,
                      col: neighbor.col,
                      distance: neighbor.distance,
                    });
                }
            }
        }
    }

    return visitedNode;
}


  
  // Backtracks from the finishNode to find the shortest path.
  // Only works when called *after* the dijkstra method above.
  export function getNodesInShortestPathOrder(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
  }

