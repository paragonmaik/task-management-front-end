import HomeCSS from '../components/styles/home.module.css';
import DashBoard from '../components/dashBoard/DashBoard';
import SideBar from '../components/SideBar';
import useBoard from '../components/hooks/useBoard';
import Header from '../components/Header';
import { useContext, useState } from 'react';
import { TaskContext } from '../context/TaskContext';

export default function Home() {
  const { data: boards } = useBoard();
  const { currentBoardIdx } = useContext(TaskContext);
  const [show, setShow] = useState(true);

  return (
    <div className={HomeCSS.container}>
      <Header board={boards ? boards[currentBoardIdx] : undefined} />
      <div className={HomeCSS.boardContainer}>
        <SideBar boardsList={boards} show={show} setShow={setShow} />
        <div className={show ? HomeCSS.visibleNav : HomeCSS.hiddenNav}>
          <DashBoard board={boards ? boards[currentBoardIdx] : undefined} />
        </div>
      </div>
    </div>
  );
}
