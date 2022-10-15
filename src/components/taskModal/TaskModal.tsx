import { FormEvent, useContext, useState, useRef } from 'react';
import { TaskContext } from '../../context/TaskContext';
import { useLocalStorage } from '../../utils/useLocalStorage';
import { ITasksState, ISubTask } from '../../typescript/types';
import { options } from '../../utils/taskSelectOptions';
import TaskModalCSS from './taskModal.module.css';

function TaskModal() {
  const { isModalOpen, setIsModalOpen, tasksState } = useContext(TaskContext);
  const [_state, setState] = useLocalStorage('tasksState', tasksState);
  const [subTask, _setSubTask] = useState<ISubTask[]>([]);
  const subtaskInputRef = useRef<HTMLInputElement>(null);
  

  const handleCloseModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  function getTaskValues(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const maxDescriptionLength = 150;
    const { description } = e.target as typeof e.currentTarget;
    const { columnSelect } = e.target as typeof e.currentTarget;

    if (description.value.length < 1) {
      throw new Error('You need a description.');
    } 
    if (description.value.length > maxDescriptionLength) {
      throw new Error('Your description is too long.');
    }
    createTask(description.value, columnSelect.value);
    e.currentTarget.reset();
  };

  function createTask(description: string, taskType = 'todo') {
    const tasksStateCopy = tasksState;
    tasksStateCopy[taskType as keyof ITasksState].tasks.push({
      description,
      id: (tasksStateCopy[taskType as keyof ITasksState].tasks.length + Math.trunc(Math.random() * 1000)).toString(),
      subTask,
    });

    setState(tasksStateCopy);
    setIsModalOpen(!isModalOpen);
  };

  function createSubTask() {
    if (!subtaskInputRef.current?.value) {
      throw new Error('You need a description.');
    }
    const description = subtaskInputRef.current.value;
    subTask.push({
      description,
      id: (subTask.length + Math.trunc(Math.random() * 1000)).toString(),
    });
  }

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
            className={ TaskModalCSS.closeModal }
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
            placeholder='Task description'
          />
          <label htmlFor="subTasks">
            Subtasks
          </label>
          <input
            ref={ subtaskInputRef }
            className={ TaskModalCSS.subTaskInput }
            type="text"
            placeholder='Subtask'
          />
          <button
          onClick={ createSubTask }
            className={ TaskModalCSS.createSubTaskBtn }
            type="button"
          >
            Add Subtask
          </button>
          <select
            id="columnSelect"
            className={ TaskModalCSS.selectInput }
          >
            {options.map(({ label, value }) => (
              <option
                key={value}
                value={ value }
              >
                {label}
              </option>
            ))}
          </select>
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
