import { TaskContext } from '../context/TaskContext';
import { useContext } from 'react';
import { Columns } from './columns/Columns';
import { sortDraggableList } from './helpers/sortDraggableList';
import { board } from '../typescript/types';
import AddTaskModal from './taskModal/AddTaskModal';
import EditTaskModal from './editTaskModal/EditTaskModal';
import dashBoardCSS from './styles/dashBoard.module.css';
import useColumn from './hooks/useColumn';

type DashBoardProps = {
  board: board | undefined;
};

function DashBoard({ board }: DashBoardProps) {
  const { isModalOpen, isEditModalOpen } = useContext(TaskContext);
  const { data: columns, isLoading, error, isError } = useColumn(board?._id);

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
