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
        <button
          className={ HeaderCSS.addBtn }
          type="button"
          onClick={ handleModal }
        >
          +
        </button>
        <p>Standard Board</p>
      </nav>
    </header>
  )
}

export default Header;
