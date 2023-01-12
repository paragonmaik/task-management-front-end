import { FormEvent } from 'react';

type UserFormProps = {
	children?: JSX.Element[] | JSX.Element;
	navigate: CallableFunction;
	errorMessage: string | undefined;
	setErrorMessage: (errorMessage: string) => void;
	handleSubmit: (
		e: FormEvent<HTMLFormElement>,
		navigate: CallableFunction,
		setErrorMessage: (errorMessage: string) => void
	) => void;
};

export const UserForm = ({
	children,
	navigate,
	errorMessage,
	setErrorMessage,
	handleSubmit,
}: UserFormProps) => {
	return (
		<>
			<div>
				<h4>Sign in</h4>
				<form onSubmit={(e) => handleSubmit(e, navigate, setErrorMessage)}>
					{children}
					<label htmlFor='email'>
						<p>e-mail</p>
						<input
							id='email'
							type='text'
							placeholder='e-mail'
						/>
					</label>

					<label htmlFor='password'>
						<p>password</p>
						<input
							id='password'
							type='password'
							placeholder='password'
						/>
					</label>
					<button type='submit'>Login</button>
				</form>
				<div>{errorMessage ? <p>{errorMessage}</p> : null}</div>
			</div>
		</>
	);
};
