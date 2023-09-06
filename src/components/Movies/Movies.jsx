/* import SearchForm from '../SearchForm/SearchForm';
 import Preloader from '../Preloader/Preloader'; 
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import '../Movies/Movies.css';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function Movies({ movies, savedMoviesList, onCardSave, onCardDelete }) {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const location = useLocation();
  const [isSearchEmpty, setIsSearchEmpty] = useState(false);
  const [isDurationEmpty, setIsDurationEmpty] = useState(false);
  const [query, setQuery] = useState('');
  const [isShortMoviesChecked, setIsShortMoviesChecked] = useState(false);

  function filterMovies(query, shortMovies, movies) {
    const filteredMovies = movies.filter((movie) => {
      const lowerCaseQuery = query.toLowerCase();
      const nameRULowerCase = movie.nameRU.toLowerCase();
      const nameENLowerCase = movie.nameEN.toLowerCase();
      return (
        (nameRULowerCase.includes(lowerCaseQuery) || nameENLowerCase.includes(lowerCaseQuery)) &&
        (!shortMovies || (shortMovies && movie.duration <= 40))
      );
    });
    setFilteredMovies(filteredMovies);
  }

   useEffect(() => {

    const savedSearchQuery = localStorage.getItem('searchQuery');
    const initialSearchQuery = savedSearchQuery;
    setQuery(initialSearchQuery);

    const savedIsShortMoviesChecked = localStorage.getItem('isShortMoviesChecked');
    const initialIsShortMoviesChecked = savedIsShortMoviesChecked === 'true';
    setIsShortMoviesChecked(initialIsShortMoviesChecked);

    const filteredMovies = movies.filter((movie) => {
      const lowerCaseQuery = initialSearchQuery.toLowerCase();
      const nameRULowerCase = movie.nameRU.toLowerCase();
      const nameENLowerCase = movie.nameEN.toLowerCase();
      return (
        (nameRULowerCase.includes(lowerCaseQuery) || nameENLowerCase.includes(lowerCaseQuery)) &&
        (!initialIsShortMoviesChecked || (initialIsShortMoviesChecked && movie.duration <= 40))
      );
    });

    setFilteredMovies(filteredMovies);
  }, [movies]); 

/  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      // При первой загрузке страницы получаем сохраненные значения из localStorage
      const savedIsSearchEmpty = localStorage.getItem('isSearchEmpty');
      const savedIsDurationEmpty = localStorage.getItem('isDurationEmpty');

      // Преобразуем полученные строки в булевы значения
      const initialIsSearchEmpty = savedIsSearchEmpty === 'true';
      const initialIsDurationEmpty = savedIsDurationEmpty === 'true';

      // Устанавливаем значения в состояния
      setIsSearchEmpty(initialIsSearchEmpty);
      setIsDurationEmpty(initialIsDurationEmpty);
    }
  }, []); 

  function handleSearch(query, shortMovies) {
    // Выполняем фильтрацию в зависимости от переданных данных
    const filteredMovies = filterMovies(query, shortMovies, movies);
    setIsSearchEmpty(filteredMovies.length === 0);
    setIsDurationEmpty(
      filteredMovies.length > 0 && filteredMovies.every((movie) => movie.duration > 40)
    );

    // Сохраняем состояния в localStorage
    localStorage.setItem('isSearchEmpty', filteredMovies.length === 0);
    localStorage.setItem('isDurationEmpty', filteredMovies.length > 0 && filteredMovies.every((movie) => movie.duration > 40));
  }

  function handleSearch(filteredMovies) {
      setFilteredMovies(filteredMovies);
      setIsSearchEmpty(filteredMovies.length === 0);
      setIsDurationEmpty(
        filteredMovies.length > 0 && filteredMovies.every((movie) => movie.duration > 40)
      );
    }

  function handleQueryChange(newQuery) {
    setQuery(newQuery);
    localStorage.setItem('searchQuery', newQuery);
  }

  return (
    <main className="main">
      <SearchForm
        onSearch={handleSearch}
        moviesToFilter={location.pathname === '/movies' ? movies : savedMoviesList}
        query={query}
        onQueryChange={handleQueryChange}
        setShortMovies={setIsShortMoviesChecked}
      />
      {(isSearchEmpty || isDurationEmpty) && (
        <p className="movies__empty">Ничего не найдено</p>
      )}
      {!isSearchEmpty && !isDurationEmpty && (
        <MoviesCardList
          movies={filteredMovies}
          savedMoviesList={savedMoviesList}
          onCardSave={onCardSave}
          onCardDelete={onCardDelete}
          isSaved={false}
        />
      )}
    </main>
  );
}; */

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import '../Movies/Movies.css';

export default function Movies({ movies, savedMoviesList, onCardSave, onCardDelete }) {
  const location = useLocation();
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isSearchEmpty, setIsSearchEmpty] = useState(false);
  const [isDurationEmpty, setIsDurationEmpty] = useState(false);
  const [query, setQuery] = useState('');
  const [isShortMoviesChecked, setIsShortMoviesChecked] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('searchQuery')) {
      setQuery(localStorage.getItem('searchQuery'));
    }
  }, []);

  useEffect(() => {
    filterMovies(query, isShortMoviesChecked, movies);
  }, [query, isShortMoviesChecked, movies]);

  const handleSearch = (newQuery, shortMovies) => {
    setQuery(newQuery);
    setIsShortMoviesChecked(shortMovies);
    localStorage.setItem('searchQuery', newQuery);
  };

  const filterMovies = (query, shortMovies, movies) => {
    const filteredMovies = movies.filter((movie) => {
      const lowerCaseQuery = query.toLowerCase();
      const nameRULowerCase = movie.nameRU.toLowerCase();
      const nameENLowerCase = movie.nameEN.toLowerCase();
      return (
        (nameRULowerCase.includes(lowerCaseQuery) || nameENLowerCase.includes(lowerCaseQuery)) &&
        (!shortMovies || (shortMovies && movie.duration <= 40))
      );
    });
    setFilteredMovies(filteredMovies);
    setIsSearchEmpty(filteredMovies.length === 0);
    setIsDurationEmpty(filteredMovies.length > 0 && filteredMovies.every((movie) => movie.duration > 40));
  };

  return (
    <main className="main">
      <SearchForm
        onSearch={handleSearch}
        query={query}
        setShortMovies={setIsShortMoviesChecked}
      />
      {(isSearchEmpty || isDurationEmpty) && (
        <p className="movies__empty">Ничего не найдено</p>
      )}
      {!isSearchEmpty && !isDurationEmpty && (
        <MoviesCardList
          movies={filteredMovies}
          savedMoviesList={savedMoviesList}
          onCardSave={onCardSave}
          onCardDelete={onCardDelete}
          isSaved={false}
        />
      )}
    </main>
  );
}
