import { useContext, useEffect } from 'react';
import { TaskContext } from '../../context/TaskContext';
import { initialState } from '../../utils/initialTasksState';
import { useLocalStorage } from '../../utils/useLocalStorage';
import axios from 'axios'
import HeaderCSS from './header.module.css';

function Header() {
  // useEffect(() => {
  //   async function getTest () {
  //     const test = await axios.get('http://localhost:3000/board', {
  //       headers: {
  //         Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImRvbmtleWtvbmciLCJlbWFpbCI6ImRvbmtleUBleGFtcGxlLmNvbSIsImlhdCI6MTY3MjUwODQ3MX0.GP3-t_4GnM33vQT2qFAUDqAcJc_ph5_U96yeKtkeSZw'
  //       }
  //     })
  //     console.log(test)
  //   }
  //   getTest()
  // });

  const { isModalOpen, setIsModalOpen, tasksState, setTasksState } = useContext(TaskContext);
  const [state, setState] = useLocalStorage('tasksState', tasksState);

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleClearBoard = () => {
    setState(initialState);
    setTasksState(initialState);

    window.location.reload();
  };
  
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
            onClick={ handleClearBoard }
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
