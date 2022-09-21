import React, { useState, useEffect } from 'react';
import '../../assets/style/Modal.css';

const Modal = ({ open, close, header, children }) => {
  const closeOnEscape = (e) => {
    if ((e.charCode || e.keyCode) === 27) {
      close();
    }
  };

  useEffect(() => {
    document.body.addEventListener('keydown', closeOnEscape);

    return () => document.body.removeEventListener('keydown', closeOnEscape);
  });

  return (
    <div className={`modal-container ${open ? 'show' : ''}`} onClick={close}>
      <div className='modal' onClick={(e) => e.stopPropagation()}>
        <div className='modal-header'>
          <h1>{header}</h1>
          <i class='icon fa-solid fa-xmark' onClick={close}></i>
        </div>

        <div className='modal-body'>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
