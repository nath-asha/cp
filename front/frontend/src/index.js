import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import { AuthProvider } from './provider/AuthProvider';
import { GoogleOAuthProvider } from '@react-oauth/google';
// import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
        <GoogleOAuthProvider clientId=" 332029749150-bct7v2nuua1drh52d46snrfelg761uv2.apps.googleusercontent.com">
            {/* <AuthProvider> */}

        {/* <BrowserRouter> */}
    <App />
    {/* </BrowserRouter> */}
    {/* </AuthProvider> */}
    </GoogleOAuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
