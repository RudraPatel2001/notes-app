import classNames from 'classnames';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Homepage from './components/Homepage/Homepage';

function App() {
  return (
    <div className={classNames(
      'flex flex-col h-screen w-screen',
    )}
    >
      <Homepage />
      <ToastContainer />
    </div>
  )
}

export default App
