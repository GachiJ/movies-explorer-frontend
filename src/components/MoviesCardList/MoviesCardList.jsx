import '../MoviesCardList/MoviesCardList.css'
/* import { movies } from '../../utils/movies'; */
import MoviesCard from '../MoviesCard/MoviesCard';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function MoviesCardList({ movies, savedMoviesList, onCardSave, onCardDelete, isSaved }) {
  const { pathname } = useLocation();

  const [cardsToShow, setCardsToShow] = useState(0);


  useEffect(() => {
    const handleResize = () => {
      let newCardsToShow;

      if (window.innerWidth >= 1280) {
        newCardsToShow = 12;
      } else if (window.innerWidth >= 768) {
        newCardsToShow = 8;
      } else {
        newCardsToShow = 5;
      }

      setCardsToShow(newCardsToShow);
    };

    const throttledResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(handleResize, 250);
    };

    let resizeTimer;
    window.addEventListener("resize", throttledResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", throttledResize);
    };
  }, []);

  const loadMoreCards = () => {
    if (window.innerWidth >= 1280) {
      setCardsToShow(prevCards => prevCards + 12);
    } else if (window.innerWidth >= 768) {
      setCardsToShow(prevCards => prevCards + 8);
    } else {
      setCardsToShow(prevCards => prevCards + 5);
    }
  };

  function getSavedMovieCard(savedMovies, movie) {
    return savedMovies.find((savedMovie) => savedMovie.movieId === movie.id);
  }



  return (
    <section className="movies-card-list">
      {pathname === '/movies' ? (
        <ul className="movies-card-list__section">
          {movies.slice(0, cardsToShow).map((movie) => (
            <MoviesCard
              key={isSaved ? movie._id : movie.id}
              movie={movie}
              saved={getSavedMovieCard(savedMoviesList, movie)}
              savedMoviesList={savedMoviesList}
              isSaved={isSaved}
              onCardSave={onCardSave}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>) : (
        <ul className="movies-card-list__section">
          {savedMoviesList.slice(0, cardsToShow).map((movie) => (
            <MoviesCard
              key={isSaved ? movie._id : movie.id}
              movie={movie}
              onCardDelete={onCardDelete}
              saved={getSavedMovieCard(savedMoviesList, movie)}
              isSaved={isSaved}
              savedMoviesList={savedMoviesList}
            />
          ))}
        </ul>
      )}
      {pathname === '/movies' && cardsToShow < movies.length ? (
        <button
          className="movies-card-list__load-more"
          onClick={loadMoreCards}
        >
          Ещё
        </button>
      ) : null}
    </section>
  );
};