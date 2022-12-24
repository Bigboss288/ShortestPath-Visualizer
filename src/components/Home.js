import React, { useEffect, useState } from "react";
import './CSS/home.css'
import './CSS/navbar.css'
import './CSS/modal.css'
import { dijkstra, getNodesInShortestPathOrder } from "../Algorithms/Dijkstra";
import Navbar from "./Navbar";
import Node from "./Node";
import Footer from "./Footer";
import Modal from "./Modal";

let START_NODE_ROW = null;
let START_NODE_COL = null;
let FINISH_NODE_ROW = null;
let FINISH_NODE_COL = null;

const Home = () => {
  const [grid, setgrid] = useState([]);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [startNodeIsSelected, setStartNode] = useState(false);
  const [endNodeInSelected, setEndNode] = useState(false);
  const [count,setCount] = useState(0)
  const [className,setClassName] = useState("")
  const [title,setTitle] = useState("")

  const warning_title = "Select Start node and End Node to continue..."
  const visual_title = "Visualizing Dijkstra's algorithm, which is an algorithm for finding the shortest paths between nodes in a graph."

  useEffect(() => {
    const initialGrid = getInitialGrid();
    setgrid(initialGrid);
  }, []);

  function handleMouseDown(row, col) {
    if (startNodeIsSelected && START_NODE_ROW === null && START_NODE_COL === null) {
      START_NODE_ROW = row;
      START_NODE_COL = col;
      const newGrid = getNewGridWithNodeToggled(grid, row, col, "start");
      setgrid(newGrid);
      setMouseIsPressed(true);
    } else if (
      endNodeInSelected &&
      FINISH_NODE_ROW === null &&
      FINISH_NODE_COL === null
    ) {
      FINISH_NODE_ROW = row;
      FINISH_NODE_COL = col;
      const newGrid = getNewGridWithNodeToggled(grid, row, col, "end");
      setgrid(newGrid);
      setMouseIsPressed(true);
    } else {
      const newGrid = getNewGridWithWallToggled(grid, row, col);
      setgrid(newGrid);
      setMouseIsPressed(true);
    }

    document.querySelector('.grid').style.cursor = 'auto'
  }

  function handleMouseEnter(row, col) {
    if (!mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(grid, row, col);
    setgrid(newGrid);
  }

  function handleMouseUp() {
    setMouseIsPressed(false);
  }

  function setStartNodeToTrue(){
   setStartNode(true)
   document.querySelector(".start_node").style.background = '#3250aa'
   document.querySelector('.grid').style.cursor = 'pointer'

  }

  function setEndNodeToTrue(){
    setEndNode(true)
    document.querySelector(".end_node").style.background = '#3250aa'
    document.querySelector('.grid').style.cursor = 'pointer'
 
   }

  function animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 1; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      if (i === visitedNodesInOrder.length - 1) continue;
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, 10 * i);
    }
  }

  function animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 1; i < nodesInShortestPathOrder.length - 1; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
      }, 50 * i);
    }
    document.querySelector('.home-timer-container').style.display = 'block'
  }

  function visualizeDijkstra() {
    if(!startNodeIsSelected || !endNodeInSelected){
      setClassName("warning")
      setTitle(warning_title)
      document.querySelector(".modal-alert").style.display = 'flex'
    }
   else{
    setClassName("info")
    setTitle(visual_title)
    document.querySelector(".modal-alert").style.display = 'flex'

    setTimeout(()=>{
      document.querySelector(".modal-alert").style.display = 'none'
    },5000)

    document.querySelector(".navbar-reset").style.display = 'block'
    document.querySelector('.start_node').style.display = 'none'
    document.querySelector('.end_node').style.display = 'none'
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    setCount(nodesInShortestPathOrder.length-1)
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
   }
  }

  
  return (
    <div className="home-container">
      <Navbar startNode={() => setStartNodeToTrue()} 
              endNode={() => setEndNodeToTrue()}
              dijkstra={() => visualizeDijkstra()}
              />
              
              <div className='home-timer-container'>
                  <span>Time : {count} [1 Time = 1 Block]</span>
                 </div>
              <div>
                <Modal className={className}
                       title={title}/>
              </div>
              
      <div className="grid">
        {grid.map((row, rowIdx) => {
          return (
            <div key={rowIdx}>
              {row.map((node, nodeIdx) => {
                const { row, col, isFinish, isStart, isWall } = node;
                return (
                  <Node
                    key={nodeIdx}
                    col={col}
                    isFinish={isFinish}
                    isStart={isStart}
                    isWall={isWall}
                    mouseIsPressed={mouseIsPressed}
                    onMouseDown={(row, col) => handleMouseDown(row, col)}
                    onMouseEnter={(row, col) => handleMouseEnter(row, col)}
                    onMouseUp={() => handleMouseUp()}
                    row={row}
                  ></Node>
                );
              })}
            </div>
          );
        })}
      </div>
      <Footer/>
    </div>
  );
};

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 23; row++) {
    const currentRow = [];
    for (let col = 0; col < 60; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
    weight: 0,
  };
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

const getNewGridWithNodeToggled = (grid, row, col, stat) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  if (stat === "start") {
    const newNode = {
      ...node,
      isStart: true,
    };
    newGrid[row][col] = newNode;
  } else {
    const newNode = {
      ...node,
      isFinish: true,
    };
    newGrid[row][col] = newNode;
  }

  return newGrid;
};

export default Home;
