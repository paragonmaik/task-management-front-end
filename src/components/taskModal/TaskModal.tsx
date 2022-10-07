import { FormEvent, useContext } from 'react';
import { TaskContext } from '../../context/TaskContext';
import TaskModalCSS from './taskModal.module.css';
import { DragIds, TasksState } from '../../typescript/types';

function TaskModal() {
  const { isModalOpen, setIsModalOpen, setTasksState, tasksState } = useContext(TaskContext);

  const handleCloseModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  function getTaskValues(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { title: { value } } = e.target as typeof e.target & {
      title: { value: string }
    };
    const { description } = e.target as typeof e.currentTarget;
    if (value.length < 1 || description.value.length < 1) {
      throw new Error('You need both a description and title.');
    } 
    createTask(value, description.value);
    e.currentTarget.reset();
  };

  function createTask(title: string, description: string, taskType = 'todo') {
    const tasksStateCopy = tasksState;
    tasksStateCopy[taskType as keyof TasksState].tasks.push({
      title,
      description,
      id: (tasksStateCopy[taskType as keyof TasksState].tasks.length + 1).toString(),
    })
    setTasksState(tasksStateCopy);
  };

  return (
    <div
      className={ TaskModalCSS.modalContainer }
    >
      <section
        className={ TaskModalCSS.taskSettingsContainer }
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
          <label htmlFor="title">
            Title
          </label>
          <input
            id="title"
            className={ TaskModalCSS.titleInput }
            name="title"
            type="text"
          />
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
