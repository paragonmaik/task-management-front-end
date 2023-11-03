import ColumnsCSS from './styles/columns.module.css';
import Column from './Column';
import { FormEvent, useContext, useEffect, useState } from 'react';
import {
  getListStyle,
  handleColumnDrag,
  handleTaskDrag,
} from '../utils/dragAndDropHandlers';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { CreationForm } from './ui/CreationForm';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosRequest } from '../utils/axiosRequest';
import { Column as ColumnType } from '../types';
import { TaskContext } from '../context/TaskContext';

type ColumnsProps = {
  boardId: string | undefined;
  columns: ColumnType[] | undefined;
};

export function Columns({ boardId, columns }: ColumnsProps) {
  const { currentTasksMap } = useContext(TaskContext);
  const [draggableColumns, setDraggableColumns] = useState<ColumnType[]>();
  const [token, _setToken] = useLocalStorage('token', '');
  const queryClient = useQueryClient();

  useEffect(() => {
    setDraggableColumns(columns);
  });

  const { mutate } = useMutation({
    mutationFn: axiosRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`columns-${boardId}`] });
    },
  });

  const validateColumnName = (e: FormEvent<HTMLFormElement>): string => {
    const maxColumnNameLength = 15;
    e.preventDefault();

    const {
      columnName: { value },
    } = e.target as typeof e.currentTarget;

    e.currentTarget.reset();

    if (!value) {
      throw new Error('Column name is required!');
    }

    if (value.length > maxColumnNameLength) {
      throw new Error("Column name can't be longer than 14 characters!");
    }

    return value;
  };

  const boardRequest = (data: {}) => {
    mutate({
      method: 'post',
      url: `/column/${boardId}`,
      headers: {
        Authorization: token,
      },
      data,
    });
  };

  const columnDragRequest = (data: {}) => {
    mutate({
      url: `/board/columns/${boardId}`,
      method: 'put',
      headers: {
        Authorization: token,
      },
      data,
    });
  };

  const taskDragRequest = (data: {}) => {
    mutate({
      url: `/column/tasks/${boardId}`,
      method: 'put',
      headers: {
        Authorization: token,
      },
      data,
    });
  };

  function handleOnDragEnd(result: DropResult) {
    if (!result.destination) return;
    if (!draggableColumns) return;

    if (result.type === 'columns') {
      const columnsList = handleColumnDrag(draggableColumns, result);

      setDraggableColumns(columnsList);
      const columnsIdsList = columnsList.map(({ _id }) => _id);

      columnDragRequest({
        columns: columnsIdsList,
      });
    }

    if (result.type === 'tasks') {
      const updatedColumns = handleTaskDrag(
        draggableColumns,
        currentTasksMap,
        result
      );

      taskDragRequest({
        updatedColumns,
      });
    }
  }

  function handleColumn(e: FormEvent<HTMLFormElement>) {
    const columnName = validateColumnName(e);

    boardRequest({
      columnName,
    });
  }

  return (
    <div className={ColumnsCSS.bg}>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable type="columns" droppableId="columns" direction="horizontal">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {draggableColumns?.map(({ _id, columnName, tasks }, i) => (
                <Column
                  key={_id}
                  _id={_id}
                  position={i}
                  columnName={columnName}
                  taskIds={tasks}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div className={ColumnsCSS.formContainer}>
        <CreationForm handleComponent={handleColumn} type="column" />
      </div>
    </div>
  );
}
