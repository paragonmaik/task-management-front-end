import { TaskContext } from '../context/TaskContext';
import { useContext } from 'react';
import { Columns } from './Columns';
import { sortDraggableList } from '../utils/sortDraggableList';
import { Board } from '../types';
import AddTaskModal from './AddTaskModal';
import EditTaskModal from './EditTaskModal';
import dashBoardCSS from './styles/dashBoard.module.css';
import useColumn from '../hooks/useColumn';

type DashBoardProps = {
  board: Board | undefined;
};

function DashBoard({ board }: DashBoardProps) {
  const { isModalOpen, isEditModalOpen } = useContext(TaskContext);
  const { data: columns } = useColumn(board?._id);

  const sortedColumns = sortDraggableList(columns, board?.columns);

  return (
    <div className={dashBoardCSS.bg}>
      {columns ? (
        <>
          <Columns boardId={board?._id} columns={sortedColumns} />
        </>
      ) : (
        <p>No board selected</p>
      )}
      {isModalOpen ? <AddTaskModal /> : null}
      {isEditModalOpen ? <EditTaskModal /> : null}
    </div>
  );
}

export default DashBoard;
