import React from 'react';
import './App.scss';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Outlet } from 'react-router-dom';

export const App = () => {
  return (
    <div className="App">
      <Header />

      <div className="container main-container">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}
