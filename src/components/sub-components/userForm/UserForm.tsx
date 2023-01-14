import { FormEvent, useContext } from 'react';
import { TaskContext } from '../../../context/TaskContext';
import { UserAuth } from '../../../typescript/types';
import { InputField } from '../inputField/InputField';
import { useNavigate } from 'react-router-dom';
import UserFormCSS from './userForm.module.css';

type UserFormProps = {
	formType: 'LOGIN' | 'REGISTER';
	children?: JSX.Element[] | JSX.Element;
	navigate: CallableFunction;
	errorMessage: string | undefined;
	setErrorMessage: (errorMessage: string) => void;
	handleSubmit: (
		e: FormEvent<HTMLFormElement>,
		navigate: CallableFunction,
		setErrorMessage: (errorMessage: string) => void,
		setAuthUser: (authUser: UserAuth) => void
	) => void;
};

export const UserForm = ({
	formType,
	children,
	navigate,
	errorMessage,
	setErrorMessage,
	handleSubmit,
}: UserFormProps) => {
	const { setAuthUser } = useContext(TaskContext);
	const nav = useNavigate();

	return (
		<>
			<div className={UserFormCSS.bg}>
				<div className={UserFormCSS.formContainer}>
					<h4>Sign in</h4>
					<form
						className={UserFormCSS.form}
						onSubmit={(e) =>
							handleSubmit(e, navigate, setErrorMessage, setAuthUser)
						}
					>
						{children}
						<InputField
							id={'email'}
							fieldType={'email'}
							placeholder={'e-mail'}
						/>

						<InputField
							id={'password'}
							fieldType={'password'}
							placeholder={'password'}
						/>

						{formType === 'LOGIN' ? (
							<>
								<button type='submit'>Log in</button>
								<button
									type='button'
									onClick={() => nav('/register')}
								>
									Create an account
								</button>
							</>
						) : (
							<>
								<button type='submit'>Register</button>
								<button
									type='button'
									onClick={() => nav('/login')}
								>
									I already have an account
								</button>
							</>
						)}
					</form>
					<div>{errorMessage ? <p>{errorMessage}</p> : null}</div>
				</div>
			</div>
		</>
	);
};
