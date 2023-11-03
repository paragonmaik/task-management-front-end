import AuthFormCSS from './styles/baseAuthForm.module.css';

type DemoFormProps = {
  handleDemoLogin: () => void;
};

export default function DemoForm({ handleDemoLogin }: DemoFormProps) {
  return (
    <>
      <div className="m-auto my-4 w-100 d-flex w-25">
        <hr className="w-100" />
        <h4>OR</h4>
        <hr className="w-100" />
      </div>
      <div className="d-flex gap-2 flex-column m-auto w-100">
        <h3 className="m-auto">Demo the App</h3>
        <button className={AuthFormCSS.loginBtn} onClick={handleDemoLogin}>
          Demo
        </button>
      </div>
    </>
  );
}
