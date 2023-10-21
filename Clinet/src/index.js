import React from 'react';
import ReactDOM from 'react-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for styling
import './assets/index.css';
import App from './App';

// The rest of your code...

ReactDOM.render(
  <React.StrictMode>
    <ToastContainer
      position="bottom-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    /> {/* Set position to "top-right" */}
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
