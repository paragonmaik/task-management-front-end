import { FormEvent, MouseEvent, useContext } from 'react';
import { TaskContext } from '../../context/TaskContext';
import TaskModalCSS from './taskModal.module.css';
import { useLocalStorage } from '../../utils/useLocalStorage';
import { TasksState } from '../../typescript/types';

function TaskModal() {
  const { isModalOpen, setIsModalOpen, tasksState } = useContext(TaskContext);
  const [state, setState] = useLocalStorage('tasksState', tasksState);

  const handleCloseModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  function getTaskValues(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const maxDescriptionLength = 150;
    const { description } = e.target as typeof e.currentTarget;

    if (description.value.length < 1) {
      throw new Error('You need a description.');
    } 
    if (description.value.length > maxDescriptionLength) {
      throw new Error('Your description is too long.');
    }
    createTask(description.value);
    e.currentTarget.reset();
  };

  function createTask(description: string, taskType = 'todo') {
    const tasksStateCopy = tasksState;
    tasksStateCopy[taskType as keyof TasksState].tasks.push({
      description,
      id: (tasksStateCopy[taskType as keyof TasksState].tasks.length + Math.trunc(Math.random() * 1000)).toString(),
    });

    setState(tasksStateCopy);
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div
      className={ TaskModalCSS.modalContainer }
      onClick={ handleCloseModal }
    >
      <section
        className={ TaskModalCSS.taskSettingsContainer }
        onClick={ (e) => e.stopPropagation() }
      >
        <div
          className={ TaskModalCSS.taskSettingsHeader }
        >
          <h4>Add a task</h4>
          <button
            onClick={ handleCloseModal }
          >
            ×
          </button>
        </div>
        <form
          onSubmit={ (e) => getTaskValues(e) }
          className={ TaskModalCSS.form }
        >
          <label htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            className={ TaskModalCSS.descriptionInput }
            name="description"
          />
          <button
            className={ TaskModalCSS.createTaskBtn }
            type="submit"
          >
            Create Task
          </button>
        </form>
      </section>
    </div>
  )
}

export default TaskModal;
