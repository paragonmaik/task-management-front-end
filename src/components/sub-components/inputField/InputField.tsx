import InputFieldCSS from './inputField.module.css';

type InputFieldProps = {
	id: string;
	placeholder?: string;
};

export const InputField = ({ id, placeholder }: InputFieldProps) => {
	return (
		<input
			className={InputFieldCSS.inputField}
			id={id}
			type='text'
			placeholder={placeholder}
		/>
	);
};
