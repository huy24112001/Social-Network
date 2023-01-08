import React from 'react';
import ReactDOM  from 'react-dom';
import App from './App';
import {ToastContainer} from "react-toastify";
import {LoginContextProvider} from "./context/context";


ReactDOM.render(
  <React.StrictMode>
      <LoginContextProvider>
        <App />
      </LoginContextProvider>
      <ToastContainer />
  </React.StrictMode>,
    document.getElementById('root')
);


