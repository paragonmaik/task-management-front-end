import { FormEvent } from 'react';
import { axiosRequest } from '../helpers/axiosRequest';
import { AxiosError } from 'axios';
import { UserAuth } from '../../typescript/types';

const getUserCredentials = (e: FormEvent<HTMLFormElement>) => {
	// prevents form reload
	e.preventDefault();

	const { userName, email, password } = e.target as typeof e.currentTarget;
	const userCredentials = {
		userName: userName.value,
		email: email.value,
		password: password.value,
	};

	// reset form values
	e.currentTarget.reset();

	return userCredentials;
};

export const signUp = async (
	e: FormEvent<HTMLFormElement>,
	navigate: CallableFunction,
	setErrorMessage: (errorMessage: string) => void,
	setAuthUser: (authUser: UserAuth) => void
) => {
	const userCredentials = getUserCredentials(e);
	console.log(setAuthUser);

	try {
		const res = await axiosRequest({
			url: '/user',
			method: 'post',
			data: userCredentials,
		});

		if (res.status === 201) {
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
		setErrorMessage(data.message);
	}
};
