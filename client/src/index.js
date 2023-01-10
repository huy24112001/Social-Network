import React from 'react';
import ReactDOM  from 'react-dom';
import App from './App';
import {ToastContainer} from "react-toastify";
import {LoginContextProvider} from "./context/context";
import Provider from "./store/user-context";


ReactDOM.render(
  <React.StrictMode>
    <Provider>
      <LoginContextProvider>
        <App />
      </LoginContextProvider>
    </Provider>
      <ToastContainer />
  </React.StrictMode>,
    document.getElementById('root')
);


