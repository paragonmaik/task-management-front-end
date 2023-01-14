import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from './LoginController';
import { UserForm } from '../sub-components/userForm/UserForm';

export const Login = () => {
	const [errorMessage, setErrorMessage] = useState<string>();
	const navigate = useNavigate();

	return (
		<>
			<UserForm
				formType='LOGIN'
				errorMessage={errorMessage}
				setErrorMessage={setErrorMessage}
				navigate={navigate}
				handleSubmit={signIn}
			/>
		</>
	);
};
