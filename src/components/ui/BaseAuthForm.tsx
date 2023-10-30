import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Alert from 'react-bootstrap/Alert';
import AuthFormCSS from './styles/baseAuthForm.module.css';
import Loading from './Loading';

type BaseAuthFormProps = {
  children: JSX.Element | JSX.Element[];
  isLoading: boolean;
  navigateUrl: string;
  formType: 'LOGIN' | 'REGISTER';
  errorMessage: string | undefined;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

export default function BaseAuthForm({
  children,
  isLoading,
  navigateUrl,
  formType,
  errorMessage,
  handleSubmit,
}: BaseAuthFormProps) {
  const nav = useNavigate();

  return (
    <div className={AuthFormCSS.bg}>
      <div className={AuthFormCSS.formContainer}>
        <h2>{formType === 'REGISTER' ? 'Create Account' : 'Sign in'}</h2>
        <Form onSubmit={handleSubmit}>
          {formType === 'REGISTER' ? (
            <Form.Group className="mb-3" controlId="userName">
              <FloatingLabel
                controlId="userName"
                label="Username"
                className="mb-3"
              >
                <Form.Control
                  style={{
                    backgroundColor: 'rgb(45, 45, 57)',
                    border: '2px solid hsl(240, 9%, 25%)',
                    color: 'white',
                  }}
                  required
                  type="text"
                  placeholder="Username"
                />
              </FloatingLabel>
            </Form.Group>
          ) : null}
          <Form.Group className="mb-3" controlId="email">
            <FloatingLabel controlId="email" label="Email" className="mb-3">
              <Form.Control
                style={{
                  backgroundColor: 'rgb(45, 45, 57)',
                  border: '2px solid hsl(240, 9%, 25%)',
                  color: 'white',
                }}
                required
                type="email"
                placeholder="Email"
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="mb-3" controlId="password1">
            <FloatingLabel
              controlId="password1"
              label="Password"
              className="mb-3"
            >
              <Form.Control
                style={{
                  backgroundColor: 'rgb(45, 45, 57)',
                  border: '2px solid hsl(240, 9%, 25%)',
                  color: 'white',
                }}
                required
                type="password"
                placeholder="Password"
              />
            </FloatingLabel>
          </Form.Group>
          {formType === 'REGISTER' ? (
            <Form.Group className="mb-3" controlId="password2">
              <FloatingLabel
                controlId="password2"
                label="Re-enter Password"
                className="mb-3"
              >
                <Form.Control
                  style={{
                    backgroundColor: 'rgb(45, 45, 57)',
                    border: '2px solid hsl(240, 9%, 25%)',
                    color: 'white',
                  }}
                  required
                  type="password"
                  placeholder="Re-enter Password"
                />
              </FloatingLabel>
            </Form.Group>
          ) : null}
          <br />
          <div className="d-flex flex-column gap-2 justify-content-evenly">
            <button className={AuthFormCSS.loginBtn} type="submit">
              {formType === 'REGISTER' ? 'Register' : 'Login'}
            </button>
            <button
              onClick={() => nav(navigateUrl)}
              className={AuthFormCSS.createAccountBtn}
              type="button"
            >
              {formType === 'REGISTER'
                ? 'I already have an account'
                : 'Register a new account'}
            </button>
          </div>
          <div>
            {errorMessage ? (
              <Alert className="my-3" variant="danger">
                {errorMessage}
              </Alert>
            ) : null}
          </div>
        </Form>
        {children}
        <div className="my-4 d-flex flex-column align-items-center">
          {isLoading ? <Loading /> : null}
        </div>
      </div>
    </div>
  );
}
