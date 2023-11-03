import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { ProtectedRoutes } from './ProtectedRoutes';
import { Suspense } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoutes />}>
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
