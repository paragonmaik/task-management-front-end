import CreationFormCSS from './creationForm.module.css';
import { FormEvent } from 'react';

interface CreationFormProps {
	createComponent: (
		e: FormEvent<HTMLFormElement>,
		createdComponent: any[],
		setCreatedComponent: (createdComponent: any[]) => void,
		token: string
	) => void;
	createdComponent: any[];
	setCreatedComponent: (createdComponent: any[]) => void;
	token: string;
}

export const CreationForm = ({
	createComponent,
	createdComponent,
	setCreatedComponent,
	token,
}: CreationFormProps) => {
	return (
		<>
			<form
				onSubmit={(e) =>
					createComponent(e, createdComponent, setCreatedComponent, token)
				}
			>
				<input
					id='placeholder'
					type='text'
					placeholder='add new placeholder'
				/>
				<button
					type='submit'
					className={CreationFormCSS.addBtn}
				>
					+
				</button>
			</form>
		</>
	);
};
