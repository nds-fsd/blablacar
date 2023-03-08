import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './modal.module.css';

const Modal = ({ children, onClose, openModal, whatModal }) => {
  const modalReference = useRef(null);
  const navigate=useNavigate()
  useEffect(() => {
    const handleClickOutside = (e) => {
      
      if (
        e.target.contains(modalReference.current) &&
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
    <div className={`${styles.backdrop} ${openModal && styles.openModal}`} ref={modalReference}>
      <div
        className={`${styles.modal} ${openModal && styles.openModal}`}
        
      > 
        {children}
        

      </div>
    </div>
  )
}

export default Modal;