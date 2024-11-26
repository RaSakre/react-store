import closeModal from '../../images/BasketProduct/delete.svg'
import styles from './Modal.module.css'

type TModalProps = {
	onClose: () => void
	children: React.ReactNode
}

export const Modal = ({ onClose, children }: TModalProps) => {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
			<div className={styles.modal}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          <img src={closeModal} alt="" />
        </button>
        {children}
      </div>
			</div>
    </div>
  );
};