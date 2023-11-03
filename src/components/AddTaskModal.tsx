import { FormEvent, useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import { Modal } from './ui/Modal';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosRequest } from '../utils/axiosRequest';
import AddTaskModalCSS from './styles/addTaskModal.module.css';

export default function AddTaskModal() {
  const { isModalOpen, setIsModalOpen, currentColumn } =
    useContext(TaskContext);
  const [token, _setToken] = useLocalStorage('token', '');
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: axiosRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`tasks-${currentColumn._id}`],
      });
    },
  });

  const taskRequest = (data: {}) => {
    mutate({
      method: 'post',
      url: `/task/${currentColumn._id}`,
      headers: {
        Authorization: token,
      },
      data,
    });
  };

  const validateTask = (e: FormEvent<HTMLFormElement>): string => {
    const maxDescriptionLength = 151;
    e.preventDefault();

    const {
      description: { value },
    } = e.target as typeof e.currentTarget;

    e.currentTarget.reset();

    if (!value) {
      throw new Error('You need a description.');
    }

    if (value.length > maxDescriptionLength) {
      throw new Error('Your description is too long.');
    }

    return value;
  };

  function handleTask(e: FormEvent<HTMLFormElement>) {
    const description = validateTask(e);

    taskRequest({
      description,
    });
  }

  return (
    <Modal
      modalHeader={'Add new task'}
      handleModal={setIsModalOpen}
      isModalOpen={isModalOpen}
    >
      <div className={AddTaskModalCSS.containerScrollWrapper}>
        <div className={AddTaskModalCSS.taskSettingsHeader}></div>
        <form onSubmit={handleTask} className={AddTaskModalCSS.form}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            className={AddTaskModalCSS.descriptionInput}
            name="description"
            placeholder="Task description"
          />
          <button className={AddTaskModalCSS.createTaskBtn} type="submit">
            Create Task
          </button>
        </form>
      </div>
    </Modal>
  );
}
