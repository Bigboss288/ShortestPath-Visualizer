import React from 'react'
import './CSS/navbar.css'

const Navbar = (props) => {

  function Reset(){
    window.location.reload();
  }

  return (
    <div className='navbar-container'>
        <div className='navbar-left'>
          <div className='navbar-title'>Shortest Path Visualizer</div>
          <div className='navbar-node-button-container'>
            <button className='navbar-button start_node' onClick={props.startNode}>
              Start : <span className='navbar-button-start-span'></span></button>
            <button className='navbar-button end_node' onClick={props.endNode}>
              End : <span className='navbar-button-end-span'></span></button>
          </div>
          
        </div>
        <div className='navbar-right'>
          <div className='navbar-algorithm-button-container'>
            <button className='navbar-button navbar-dijkstra' onClick={props.dijkstra}>Visualize Dijkstra</button>
            <button className='navbar-button navbar-reset' onClick={()=> Reset()}>
              <span className='navbar-button-reset-span'></span>
              Reset
              </button>
          </div>
        </div>
    </div>
  )
}

export default Navbar