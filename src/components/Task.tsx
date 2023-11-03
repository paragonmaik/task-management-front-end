import { Task as TaskType } from '../types';
import { useContext } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { TaskContext } from '../context/TaskContext';
import TaskCSS from './styles/task.module.css';
import menu from '../../public/task-menu.svg';

type TaskProps = {
  loading?: boolean;
  tasksList: TaskType[] | undefined;
};

export default function Task({ tasksList }: TaskProps) {
  const { isEditModalOpen, setIsEditModalOpen, setCurrentTask } =
    useContext(TaskContext);

  return (
    <>
      {tasksList?.map(({ _id, description }, i) => (
        <Draggable key={_id} draggableId={_id} index={i}>
          {(provided) => (
            <div
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
              <div className={TaskCSS.bg} id={_id} key={_id}>
                <div className={TaskCSS.menuContainer}>
                  <img
                    onClick={() => {
                      setIsEditModalOpen(!isEditModalOpen);
                      setCurrentTask({ _id, description });
                    }}
                    src={menu}
                  />
                </div>
                <div className={TaskCSS.detailsContainer}>
                  <p>{description}</p>
                  <p></p>
                </div>
              </div>
            </div>
          )}
        </Draggable>
      ))}
    </>
  );
}
