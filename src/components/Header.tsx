import HeaderCSS from './styles/header.module.css';
import logoutIcon from '../../public/logout.svg';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from './hooks/useLocalStorage';
import { board } from '../typescript/types';

type HeaderProps = {
  board: board | undefined;
};

export default function Header({ board }: HeaderProps) {
  const [_token, setToken] = useLocalStorage('token', '');
  const navigate = useNavigate();

  function handleLogout() {
    setToken('');
    navigate('/login');
  }

  return (
    <header className={HeaderCSS.bg}>
      <nav className={HeaderCSS.optionsContainer}>
        <h1>kanban board</h1>
        <p className={HeaderCSS.boardNameContainer}>
          {board ? board.boardName : 'Select or create a new board'}
        </p>
        <div className={HeaderCSS.btnsContainer}>
          <button
            className={HeaderCSS.logoutBtn}
            type="button"
            onClick={handleLogout}
          >
            <img src={logoutIcon} alt="logout" height="12px" />
          </button>
        </div>
      </nav>
    </header>
  );
}
