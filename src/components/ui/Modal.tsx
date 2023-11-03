import ModalCSS from './styles/modal.module.css';

type ModalProps = {
  children: JSX.Element[] | JSX.Element;
  modalHeader: string;
  isModalOpen: boolean;
  handleModal: (isModalOpen: boolean) => void;
};

export const Modal = ({
  children,
  modalHeader,
  handleModal,
  isModalOpen,
}: ModalProps) => {
  return (
    <div
      className={ModalCSS.modalContainer}
      onClick={() => handleModal(!isModalOpen)}
    >
      <section
        className={ModalCSS.taskSettingsContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={ModalCSS.closeModalContainer}>
          <h4>{modalHeader}</h4>
          <button
            className={ModalCSS.closeModalBtn}
            onClick={() => handleModal(!isModalOpen)}
          >
            ×
          </button>
        </div>
        {children}
      </section>
    </div>
  );
};
