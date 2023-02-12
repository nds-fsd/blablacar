import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NewTrip } from '../components/newTrip/newTrip';
import styles from './modal.module.css';

const Modal = ({ children, onClose, openModal, whatModal }) => {
  const modalReference = useRef(null);
  const navigate=useNavigate()
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        modalReference.current &&
        !modalReference.current.contains(e.target) &&
        openModal
      ) {
        if(whatModal !== "tripDetail"){
        onClose();
        navigate(-1);
      }else onClose()
        }

    };

    document.addEventListener('click', handleClickOutside, true);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
      
    };
  }, [modalReference, openModal]);

  if(!openModal) return null

  return (
    <div className={`${styles.backdrop} ${openModal && styles.openModal}`}>
      <div
        className={`${styles.modal} ${openModal && styles.openModal}`}
        ref={modalReference}
      > 
        {children}
        {console.log('children',children)}

      </div>
    </div>
  );
};

export default Modal;