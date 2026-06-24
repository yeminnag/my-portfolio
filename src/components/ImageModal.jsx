import { useEffect } from 'react';
import gsap from 'gsap';

export default function ImageModal({ isOpen, imageUrl, onClose }) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleClose = () => {
    const modal = document.querySelector('.modal');
    if (!modal) {
      onClose();
      return;
    }

    gsap.to(modal, {
      opacity: 0,
      duration: 0.2,
      onComplete: () => {
        modal.style.opacity = '';
        onClose();
      },
    });
  };

  if (!isOpen) return null;

  return (
    <div className="modal active">
      <div className="modal-overlay" onClick={handleClose}></div>
      <div className="modal-content">
        <span className="modal-close" onClick={handleClose}>
          &times;
        </span>
        <div
          className="modal-image"
          style={{ backgroundImage: imageUrl }}
        ></div>
      </div>
    </div>
  );
}
