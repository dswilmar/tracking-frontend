import { ToastContainer } from 'react-toastify';
import TrackingPage from './pages/TrackingPage';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'

function App() {
  return (
    <>
      <ToastContainer autoClose={5000} theme="dark" position="top-center" />
      <TrackingPage />      
    </>
  )
}

export default App
