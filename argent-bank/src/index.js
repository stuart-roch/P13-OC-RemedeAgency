import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Home from './Pages/Home';
import SignIn from './Pages/SignIn';
import Profile from './Pages/Profile';
import Header from './Components/Header';
import Footer from './Components/Footer';
import reportWebVitals from './reportWebVitals';
import Api from './utils/api/Api';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/signIn' element={<SignIn api={Api}/>}/>
        <Route path='/profile' element={<Profile api={Api}/>}/>
      </Routes>
      <Footer />
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
