import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserForm } from '../sub-components/userForm/UserForm';
import { signUp } from './RegisterController';

export const Register = () => {
	const [errorMessage, setErrorMessage] = useState<string>();
	const navigate = useNavigate();

	return (
		<>
			<UserForm
				errorMessage={errorMessage}
				setErrorMessage={setErrorMessage}
				navigate={navigate}
				handleSubmit={signUp}
			>
				<label htmlFor='userName'>
					<p>User name</p>
					<input
						id='userName'
						type='text'
						placeholder='user name'
					/>
				</label>
			</UserForm>
		</>
	);
};
