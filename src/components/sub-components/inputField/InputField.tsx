import InputFieldCSS from './inputField.module.css';

type InputFieldProps = {
	id: string;
	placeholder?: string;
	fieldType?: 'text' | 'email' | 'password';
};

export const InputField = ({
	id,
	placeholder,
	fieldType = 'text',
}: InputFieldProps) => {
	return (
		<input
			className={InputFieldCSS.inputField}
			id={id}
			type={fieldType}
			placeholder={placeholder}
		/>
	);
};
