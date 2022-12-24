import React from "react";
import "./CSS/modal.css"

const Modal = (props) => {

    function closeModal(){
        document.querySelector(".modal-alert").style.display = 'none'
       } 
       
  return (
    <div>
      <div className={`modal-alert ${props.className}`}>
        <span className={`modal-alert-icon ${props.className}-icon`}></span>
        <div className="modal-alert-title">
          {props.title}
        </div>
        <button className="modal-alert-close" onClick={() => closeModal()}>
          &#x2716;
        </button>
      </div>
    </div>
  );
};

export default Modal;
