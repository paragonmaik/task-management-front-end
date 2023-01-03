import columnsCSS from './columns.module.css';
import Column from '../column/Column';
import { column } from '../../typescript/types';
import { createColumn } from './ColumnsController';
import { TaskContext } from '../../context/TaskContext';
import { useContext } from 'react';

interface IColumns {
	loading?: boolean;
	columnsList?: column[] | null;
}

export function Columns({ columnsList }: IColumns) {
	const { createdColumns, currentBoard, setCreatedColumns } =
		useContext(TaskContext);

	return (
		<div className={columnsCSS.bg}>
			{columnsList?.map(({ _id, columnName }) => (
				<Column
					key={_id}
					colName={columnName}
				/>
			))}
			<form
				onSubmit={(e) =>
					createColumn(e, createdColumns, setCreatedColumns, currentBoard._id)
				}
			>
				<input
					id='columnName'
					type='text'
					placeholder='add new column'
				/>
				<button type='submit'>+</button>
			</form>
		</div>
	);
}
