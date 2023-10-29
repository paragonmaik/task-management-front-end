import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useContext } from 'react';
import { TaskContext } from './context/TaskContext';
import { Login } from './components/login/Login';
import { Register } from './components/register/Register';
import { ProtectedRoutes } from './ProtectedRoutes';
import { lazy, Suspense } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = lazy(() => import('./components/home/Home'));

function App() {
  const { authUser } = useContext(TaskContext);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoutes isUserAuth={authUser.logged} />}>
          <Route
            path="/home"
            element={
              <Suspense fallback="Loading...">
                <Home />
              </Suspense>
            }
          />
        </Route>
        <Route path="*" element={<div>NOT FOUND</div>} />
      </Routes>
    </Router>
  );
}

export default App;
