import TasksContainer from './components/container/TasksContainer';
import Header from './components/header/Header';
import SideBar from './components/sideBar/SideBar';

function App() {
  return (
    <>
      <Header />
      <div style={ { display: 'flex', marginTop: '81px' } }>
        <SideBar></SideBar>
        <TasksContainer />
      </div>
    </>
  )
}

export default App
