import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from './LoginController';

export const Login = () => {
	const [errorMessage, setErrorMessage] = useState<string>();
	const navigate = useNavigate();

	return (
		<>
			<div>
				<h4>Sign in</h4>
				<form onSubmit={(e) => signIn(e, navigate, setErrorMessage)}>
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
