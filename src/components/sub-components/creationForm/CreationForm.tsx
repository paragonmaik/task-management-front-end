import CreationFormCSS from './creationForm.module.css';
import { FormEvent } from 'react';

type CreationConfig = {
	createdComponent: any[];
	setCreatedComponent: (createdComponent: any[]) => void;
	token: string;
	type: 'column' | 'board';
};

interface CreationFormProps {
	createComponent: (
		e: FormEvent<HTMLFormElement>,
		createdComponent: any[],
		setCreatedComponent: (createdComponent: any[]) => void,
		token: string
	) => void;
	config: CreationConfig;
}

export const CreationForm = ({
	createComponent,
	config: { createdComponent, setCreatedComponent, token, type },
}: CreationFormProps) => {
	return (
		<>
			<form
				onSubmit={(e) =>
					createComponent(e, createdComponent, setCreatedComponent, token)
				}
			>
				<input
					id={`${type}Name`}
					type='text'
					placeholder={`add new a ${type}`}
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
