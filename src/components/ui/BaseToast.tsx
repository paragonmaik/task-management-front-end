import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

type BaseToastProps = {
  message: string;
  setShow: (show: boolean) => void;
  show: boolean;
  delay: number;
};

export default function BaseToast({
  message,
  setShow,
  show,
  delay,
}: BaseToastProps) {
  return (
    <ToastContainer position="bottom-center">
      <Toast
        className="bg-dark text-white"
        onClose={() => setShow(false)}
        show={show}
        delay={delay}
        autohide
      >
        <Toast.Header className="bg-secondary text-white">
          <strong className="me-auto">Registration</strong>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}
