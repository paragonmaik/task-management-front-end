import ColumnCSS from './column.module.css';
import { ColumnProps } from '../../typescript/types';

function Column({ colName }: ColumnProps) {
  return (
    <section
      className={ ColumnCSS.bg }
    >
      <p>
        {colName}
      </p>
      <div
        className={ ColumnCSS.taskContainer }
      >

      </div>
    </section>
  )
}

export default Column;
