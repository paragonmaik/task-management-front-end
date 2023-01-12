import { FormEvent, useState } from 'react';
import { axiosRequest } from '../helpers/axiosRequest';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

export const Login = () => {
	const [errorMessage, setErrorMessage] = useState<string>();
	const navigate = useNavigate();

	const getUserCredentials = (e: FormEvent<HTMLFormElement>) => {
		// prevents form reload
		e.preventDefault();

		const { email, password } = e.target as typeof e.currentTarget;
		const userCredentials = { email: email.value, password: password.value };

		// reset form values
		e.currentTarget.reset();

		return userCredentials;
	};

	const signIn = async (e: FormEvent<HTMLFormElement>) => {
		const userCredentials = getUserCredentials(e);

		try {
			const res = await axiosRequest({
				url: '/login',
				method: 'post',
				data: userCredentials,
			});

			if (res.status === 200) {
				navigate('/home');
			}
		} catch (e) {
			const res = e as AxiosError;
			const data: any = res.response?.data;
			setErrorMessage(data.message);
		}
	};

	return (
		<>
			<div>
				<h4>Sign in</h4>
				<form onSubmit={(e) => signIn(e)}>
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
