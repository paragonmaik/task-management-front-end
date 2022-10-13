import { useContext } from 'react';
import { TaskContext } from '../../context/TaskContext';
import HeaderCSS from './header.module.css';

function Header() {
  const {
    isModalOpen,
    setIsModalOpen,
  } = useContext(TaskContext);

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
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
            onClick={ handleModal }
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
