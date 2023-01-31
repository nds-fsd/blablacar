import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './modal.module.css';

const Modal = ({ children, onClose, openModal }) => {
  const modalReference = useRef(null);
  const navigate=useNavigate()
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        modalReference.current &&
        !modalReference.current.contains(e.target) &&
        openModal
      ) {
        onClose();
        navigate(-1);
      }
    };

    document.addEventListener('click', handleClickOutside, true);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
      
    };
  }, [modalReference, openModal]);

  return (
    <div className={`${styles.backdrop} ${openModal && styles.openModal}`}>
      <div
        className={`${styles.modal} ${openModal && styles.openModal}`}
        ref={modalReference}
      > 
        {children}
      </div>
    </div>
  );
};

export default Modal;