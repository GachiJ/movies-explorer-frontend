import { useEffect, useState } from 'react';
import {
  Route,
  Routes,
  Navigate,
  useNavigate,
  useLocation,
} from 'react-router-dom';

import Main from '../Main/Main';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';

import './App.css';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation().pathname;

  const pageLocation = location === '/movies';

  function handleMenuOpen() {
    setIsMenuOpen(!isMenuOpen)
  }


  return (
    <>
      <div className="root">
        <div className="page">
          <Header
           isOpen={isMenuOpen}
           onMenuOpen={handleMenuOpen}
          />

          <Routes>
            {/*  <Route element={<ProtectedRoutes isLoggedIn={isLoggedIn} />}> */}
            <Route
              path='/movies'
              element={
                <Movies pageLocation={pageLocation}
                />
              }
            />
            <Route
              path='/saved-movies'
              element={
                <SavedMovies
                />
              }
            />
            <Route
              path='/profile'
              element={
                <Profile
                />
              }
            />
            <Route exact path='/' element={<Main />} />
            <Route
              path='/signup'
              element={
                <Register
                />
              }
            />
            <Route
              path='/signin'
              element={
                <Login
                />
              }
            />
            <Route
              path='/404'
              element={<NotFound />}
            />
            <Route path='*' element={<Navigate to='/404' replace />} />
          </Routes>
          {/* 
          <Footer /> */}
        </div>
      </div>
    </>
  );
}

export default App;
