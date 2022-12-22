import React from "react";
import "./CSS/modal.css"

const Modal = () => {

    function closeModal(){
        document.querySelector(".modal-alert").style.display = 'none'
       }
       
  return (
    <div>
      <div className="modal-alert">
        <span className="modal-alert-icon"></span>
        <div className="modal-alert-title">
          Select Start node and End Node to continue...
        </div>
        <button className="modal-alert-close" onClick={() => closeModal()}>
          &#x2716;
        </button>
      </div>
    </div>
  );
};

export default Modal;
