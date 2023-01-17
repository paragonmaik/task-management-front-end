import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserForm } from '../sub-components/userForm/UserForm';
import { signUp } from './RegisterController';
import { InputField } from '../sub-components/inputField/InputField';

export const Register = () => {
	const [errorMessage, setErrorMessage] = useState<string>();
	const navigate = useNavigate();

	return (
		<>
			<UserForm
				formType='REGISTER'
				errorMessage={errorMessage}
				setErrorMessage={setErrorMessage}
				navigate={navigate}
				handleSubmit={signUp}
			>
				<InputField
					id={'userName'}
					placeholder={'username'}
				/>
			</UserForm>
		</>
	);
};
