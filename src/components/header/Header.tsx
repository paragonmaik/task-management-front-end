import { useContext } from 'react';
import { TaskContext } from '../../context/TaskContext';
import { initialState } from '../../utils/initialTasksState';
import { useLocalStorage } from '../../utils/useLocalStorage';
import HeaderCSS from './header.module.css';

function Header() {
  const { isModalOpen, setIsModalOpen, tasksState, setTasksState } = useContext(TaskContext);
  const [state, setState] = useLocalStorage('tasksState', tasksState);

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleClearTasks = () => {
    setTasksState(initialState);
    setState(initialState);
  }
  
  return (
    <header
      className={ HeaderCSS.bg }
    >
      <nav
        className={ HeaderCSS.optionsContainer }
      >
        <div
          className={ HeaderCSS.btnsContainer }
        >
          <button
            className={ HeaderCSS.addBtn }
            type="button"
            onClick={ handleModal }
          >
            +
          </button>
          <button
            className={ HeaderCSS.clearBtn }
            type="button"
            onClick={ handleClearTasks }
          >
            ×
          </button>
        </div>
        <p>Standard Board</p>
      </nav>
    </header>
  )
}

export default Header;
