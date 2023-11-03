import ReactDOM from 'react-dom/client';
import { TaskProvider } from './context/TaskContext';
import App from './App';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <TaskProvider>
      <App />
    </TaskProvider>
  </QueryClientProvider>
);
