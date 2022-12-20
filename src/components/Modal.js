import React from "react";

const Modal = () => {

    function closeModal(){
        document.querySelector(".home-alert").style.display = 'none'
       }
       
  return (
    <div>
      <div className="home-alert">
        <span className="home-alert-icon"></span>
        <div className="home-alert-title">
          Select Start node and End Node to continue...
        </div>
        <button className="home-alert-close" onClick={() => closeModal()}>
          &#x2716;
        </button>
      </div>
    </div>
  );
};

export default Modal;
