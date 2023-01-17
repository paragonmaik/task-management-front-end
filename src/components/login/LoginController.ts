import { FormEvent } from 'react';
import { axiosRequest } from '../helpers/axiosRequest';
import { AxiosError } from 'axios';
import { UserAuth } from '../../typescript/types';

const getUserCredentials = (e: FormEvent<HTMLFormElement>) => {
	// prevents form reload
	e.preventDefault();

	const { email, password } = e.target as typeof e.currentTarget;
	const userCredentials = { email: email.value, password: password.value };

	// reset form values
	e.currentTarget.reset();

	return userCredentials;
};

export const signIn = async (
	e: FormEvent<HTMLFormElement>,
	navigate: CallableFunction,
	setErrorMessage: (errorMessage: string) => void,
	setAuthUser: (authUser: UserAuth) => void
) => {
	const userCredentials = getUserCredentials(e);

	try {
		const res = await axiosRequest({
			url: '/login',
			method: 'post',
			data: userCredentials,
		});

		if (res.status === 200) {
			setAuthUser({
				email: userCredentials.email,
				logged: true,
				token: res.data.token,
			});
			navigate('/home');
		}
	} catch (e) {
		const res = e as AxiosError;
		const data: any = res.response?.data;
		if (!data) return;
		setErrorMessage(data.message);
	}
};
