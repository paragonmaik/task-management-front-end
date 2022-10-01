import ReactDOM from 'react-dom/client'
import { TimerProvider } from './context/TaskContext'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <TimerProvider>
    <App />
  </TimerProvider>
)
