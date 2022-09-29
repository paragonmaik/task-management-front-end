import { FormEvent, useContext } from 'react';
import { TaskContext } from '../../context/TaskContext';
import TaskModalCSS from './taskModal.module.css';

function TaskModal() {
  const { isModalOpen, setIsModalOpen, todoTasks, setTodoTasks } = useContext(TaskContext);

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
      throw new Error("You need both description and title.");
    } 
    createTask(value, description.value);
  };

  function createTask(title: string, description: string) {
    const updatedTasks = todoTasks;
    updatedTasks.push({
      title,
      description,
      id: (todoTasks.length + 1).toString(),
    })
    setTodoTasks([...updatedTasks]);
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
