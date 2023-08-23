import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { Route, Routes, Navigate } from 'react-router-dom';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import Main from '../Main/Main';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';
import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';

import './App.css';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [movies, setMovies] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [savedMoviesList, setSavedMoviesList] = useState([]);
  const [isSaved, setIsSaved] = useState(false);
  const navigate = useNavigate();
  const location = useLocation().pathname;

  const pageLocation = location === '/movies';

  useEffect(() => {
    tokenCheck();
    if (isLoggedIn) {
      Promise.all([mainApi.getUserInfo(), moviesApi.getMovies()])
        .then(([userData, moviesData]) => {
          setMovies(moviesData)
          setCurrentUser(userData)
          navigate('/');
        })
        .catch((err) => console.log(err))
    }

  }, [isLoggedIn])


  function handleLoginUser({ email, password }) {
    setIsLoader(true);
    mainApi.loginUser({ email, password })
      .then(() => {
        setIsLoggedIn(true);
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoader(false));
  }

  function tokenCheck() {
    mainApi.checkToken()
      .then(() => {
        setIsLoggedIn(true);
        navigate('/');
      })
      .catch((err) => console.log(err))
  }

  function handleSignOut() {
    mainApi.logout()
      .then(() => {
        setIsLoggedIn(false);
        navigate('/');
      })
      .catch((err) => console.log(err))
  }

  function handleRegisterUser({ name, email, password }) {
    setIsLoader(true);
    mainApi.registerUser({ name, email, password })
      .then(() => {
        navigate('/signin')
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoader(false));
  }

  function handleUpdateUser({ name, email }) {
    setIsLoader(true);
    mainApi.updateUser({ name, email })
      .then(({ name, email }) => {
        setCurrentUser({ name, email })
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoader(false));
  }

  function handleCardLike(movie) {
    mainApi.addNewMovie(movie)
      .then((newMovie) => {
        setSavedMoviesList([newMovie, ...savedMoviesList]);
        setIsSaved(true);
      })
      .catch((err) => {
        console.log(err)
      });
  }

  function handleCardDelete({ data }) {
    mainApi.deleteMovie({ data })
      .then(() => {
        setSavedMoviesList((state) => state.filter((item) => item._id !== data._id));
        setIsSaved(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }


  function handleMenuOpen() {
    setIsMenuOpen(true)
  }

  function closeAllPopups() {
    setIsMenuOpen(false)
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page">
          <Header
            isOpen={isMenuOpen}
            onMenuOpen={handleMenuOpen}
            onClose={closeAllPopups}
            isLoggedIn={isLoggedIn}
          />

          <Routes>

            <Route path='/' element={<Main />} />
            {/*  <Route element={<ProtectedRoutes isLoggedIn={isLoggedIn} />}> */}
            <Route
              path='/movies'
              element={
                <Movies pageLocation={pageLocation}
                  movies={movies}
                  savedMoviesList={savedMoviesList}
                  onCardSave={handleCardLike}
                  onCardDelete={handleCardDelete}
                  isSaved={isSaved}
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
                  onSignOut={handleSignOut}
                  onUpdateUser={handleUpdateUser}
                  isLoader={isLoader}
                />
              }
            />
            <Route path="/signup" element={<Register onRegisterUser={handleRegisterUser} />} />
            <Route path="/signin" element={<Login onLoginUser={handleLoginUser} />} />
            <Route
              path='/404'
              element={<NotFound />}
            />
            <Route path='*' element={<Navigate to='/404' replace />} />
          </Routes>

          <Routes>
            <Route path='/' element={<Footer />} />
            <Route path='/movies' element={<Footer />} />
            <Route path='/saved-movies' element={<Footer />} />
          </Routes>

        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
