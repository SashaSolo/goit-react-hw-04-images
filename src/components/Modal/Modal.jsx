import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Overlay, ModalWindow } from './Modal.styled';

export function Modal({ onClick, largeImageURL }) {
  useEffect(() => {
    const handleKeyDown = event => {
      console.log(event.code);
      if (event.code === 'Escape') {
        onClick();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClick]);

  const handleBdClick = event => {
    if (event.currentTarget === event.target) {
      onClick();
    }
  };

  return (
    <Overlay onClick={handleBdClick}>
      <ModalWindow>
        <img src={largeImageURL} alt="" />
      </ModalWindow>
    </Overlay>
  );
}

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  handleBdClick: PropTypes.func,
  handleKeyDown: PropTypes.func,
};
