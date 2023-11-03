import SideBarCSS from './styles/sideBar.module.css';
import arrows from '../../public/arrows.svg';
import { FormEvent, useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import { Board } from '../types';
import { CreationForm } from './ui/CreationForm';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosRequest } from '../utils/axiosRequest';
import Placeholders from './ui/Placeholders';

type SidebarProps = {
  isLoading: boolean;
  boardsList: Board[] | undefined;
  show: boolean;
  setShow: (sidebarState: boolean) => void;
};

export default function SideBar({
  boardsList,
  show,
  setShow,
  isLoading,
}: SidebarProps) {
  const { currentBoardIdx, setCurrentBoardIdx } = useContext(TaskContext);
  const [token, _setToken] = useLocalStorage('token', '');

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: axiosRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['boards'] });
    },
  });

  const validateBoardName = (e: FormEvent<HTMLFormElement>): string => {
    const maxBoardNameLength = 15;
    e.preventDefault();

    const {
      boardName: { value },
    } = e.target as typeof e.currentTarget;

    e.currentTarget.reset();

    if (!value) {
      throw new Error('Board name is required!');
    }

    if (value.length > maxBoardNameLength) {
      throw new Error("Board name can't be longer than 14 characters!");
    }

    return value;
  };

  const boardRequest = (data: {}) => {
    mutate({
      method: 'post',
      url: '/board',
      headers: {
        Authorization: token,
      },
      data,
    });
  };

  function handleBoard(e: FormEvent<HTMLFormElement>) {
    const boardName = validateBoardName(e);

    boardRequest({
      boardName: boardName,
    });
  }

  return (
    <nav className={show ? SideBarCSS.visibleNav : SideBarCSS.hiddenNav}>
      <div className={SideBarCSS.subMenuContainer}>
        {boardsList ? <p>All boards ({boardsList.length})</p> : null}
        <div className={SideBarCSS.boardNamesContainer}>
          {isLoading ? <Placeholders /> : null}
          {boardsList
            ? boardsList.map(({ boardName, _id }, i) => (
                <button
                  className={SideBarCSS.selectBoardBtn}
                  type="button"
                  key={_id}
                  id={_id}
                  disabled={
                    _id === boardsList[currentBoardIdx]?._id ? true : false
                  }
                  onClick={() => {
                    setCurrentBoardIdx(i);
                  }}
                >
                  {boardName}
                </button>
              ))
            : null}
        </div>
        <CreationForm handleComponent={handleBoard} type="board" />
      </div>
      <div className={SideBarCSS.optionsContainer}>
        <button
          className={SideBarCSS.hideBtn}
          type="button"
          onClick={() => {
            setShow(!show);
          }}
        >
          {show ? (
            <>
              <img
                height="16px"
                src={arrows}
                style={{ transform: 'rotate(180deg)', marginRight: '4px' }}
              />
            </>
          ) : (
            <img height="16px" src={arrows} />
          )}
        </button>
      </div>
    </nav>
  );
}
