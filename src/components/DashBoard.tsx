import { TaskContext } from '../context/TaskContext';
import { useContext } from 'react';
import { Columns } from './Columns';
import { sortDraggableList } from '../utils/sortDraggableList';
import { Board } from '../types';
import AddTaskModal from './AddTaskModal';
import EditTaskModal from './EditTaskModal';
import dashBoardCSS from './styles/dashBoard.module.css';
import useColumn from '../hooks/useColumn';
import Loading from './ui/Loading';

type DashBoardProps = {
  board: Board | undefined;
  isLoading: boolean;
};

export default function DashBoard({ board, isLoading }: DashBoardProps) {
  const { isModalOpen, isEditModalOpen } = useContext(TaskContext);
  const { data: columns } = useColumn(board?._id);

  const sortedColumns = sortDraggableList(columns, board?.columns);

  return (
    <div className={dashBoardCSS.bg}>
      {isLoading ? <Loading /> : null}
      {columns ? (
        <>
          <Columns boardId={board?._id} columns={sortedColumns} />
        </>
      ) : null}
      {isModalOpen ? <AddTaskModal /> : null}
      {isEditModalOpen ? <EditTaskModal /> : null}
    </div>
  );
}
