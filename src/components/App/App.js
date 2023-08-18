//app - корневой компонент приложения, его создаёт CRA
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Main from '../Main/Main';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

function App() {
  // eslint-disable-next-line
  const [isLoggedIn, setLoggedIn] = useState(true);

  return (
    <>
      <Routes>
        <Route path='/' element={<Main isLoggedIn={isLoggedIn} />} />
        <Route path='/movies' element={<Movies isLoggedIn={isLoggedIn} />} />
        <Route
          path='/saved-movies'
          element={<SavedMovies isLoggedIn={isLoggedIn} />}
        />
        <Route path='/signup' element={<Register />} />
        <Route path='/signin' element={<Login />} />
        <Route path='/profile' element={<Profile isLoggedIn={isLoggedIn} />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
