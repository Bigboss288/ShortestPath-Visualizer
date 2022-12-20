import React, { Component } from "react";
import "./CSS/node.css";

const Node = (props) => {

  const {row,col,isStart,isFinish,isWall,onMouseDown,onMouseEnter} = props

  const extraClassName = isStart
  ? "node-start" : isFinish
  ? "node-finish" : isWall
  ? "node-wall" : "";

  return (
    <div 
    id={`node-${row}-${col}`}
    className={`node ${extraClassName}`}
    onMouseDown={() => onMouseDown(row,col)}
    onMouseEnter={() => onMouseEnter(row,col)} //return func from child to parent without .props
    onMouseUp={() => props.onMouseUp()} //two ways to return callback func from child to parent
    ></div>
  )
}

export default Node
