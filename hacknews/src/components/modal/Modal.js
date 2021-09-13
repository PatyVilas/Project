import './modal.css';

function Modal({ children, isOpen, closeModal }) {
    const handleModalClick = (e) => e.stopPropagation();
    return (
        <div className={`modal ${isOpen && "is-open"}`} onClick={closeModal}>
            <div className="modalContent" onClick={handleModalClick}>
                <button className="buttonClose" onClick={closeModal}>X</button>
                {children}
            </div>
        </div>
    );
}

export default Modal;