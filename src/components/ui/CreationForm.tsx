import CreationFormCSS from './styles/creationForm.module.css';
import { FormEvent } from 'react';
import { InputField } from './InputField';

type CreationFormProps = {
  handleComponent: (e: FormEvent<HTMLFormElement>) => void;
  type: 'column' | 'board';
};

export const CreationForm = ({ handleComponent, type }: CreationFormProps) => {
  return (
    <form onSubmit={handleComponent} className={CreationFormCSS.formContainer}>
      <div className="d-flex align-items-center w-100">
        <InputField id={`${type}Name`} placeholder={`add new a ${type}`} />
        <button type="submit" className={CreationFormCSS.addBtn}>
          +
        </button>
      </div>
    </form>
  );
};
