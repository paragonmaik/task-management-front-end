import HomeCSS from '../components/styles/home.module.css';
import DashBoard from '../components/DashBoard';
import SideBar from '../components/SideBar';
import useBoard from '../hooks/useBoard';
import Header from '../components/Header';
import { useContext, useState } from 'react';
import { TaskContext } from '../context/TaskContext';

export default function Home() {
  const { data: boards, isLoading } = useBoard();
  const { currentBoardIdx } = useContext(TaskContext);
  const [show, setShow] = useState(true);

  return (
    <div className={HomeCSS.container}>
      <Header board={boards ? boards[currentBoardIdx] : undefined} />
      <div className={HomeCSS.boardContainer}>
        <SideBar
          boardsList={boards}
          show={show}
          setShow={setShow}
          isLoading={isLoading}
        />
        <div className={show ? HomeCSS.visibleNav : HomeCSS.hiddenNav}>
          <DashBoard
            board={boards ? boards[currentBoardIdx] : undefined}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
