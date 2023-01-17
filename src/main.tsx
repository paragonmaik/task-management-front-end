import ReactDOM from 'react-dom/client';
import { TaskProvider } from './context/TaskContext';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<TaskProvider>
		<App />
	</TaskProvider>
);
