import ModalCSS from './modal.module.css';

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
				// stops event bubbling so clicking anywhere besides the close modal
				// button or the outer div won't close the modal
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
