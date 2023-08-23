import '../MoviesCardList/MoviesCardList.css'
/* import { movies } from '../../utils/movies'; */
import MoviesCard from '../MoviesCard/MoviesCard';
import { useEffect, useState } from 'react';

export default function MoviesCardList({ pageLocation, movies, savedMovies }) {

    const [cardsToShow, setCardsToShow] = useState(4); // Начальное количество карточек
  
    useEffect(() => {
      const handleResize = () => {
        let newCardsToShow;
  
        if (window.innerWidth >= 1280) {
          newCardsToShow = 4;
        } else if (window.innerWidth >= 768) {
          newCardsToShow = 4;
        } else {
          newCardsToShow = 1;
        }
  
        setCardsToShow(newCardsToShow);
      };
  
      const throttledResize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(handleResize, 250); // Откладываем вызов на 250 мс
      };
  
      let resizeTimer;
      window.addEventListener("resize", throttledResize);
      handleResize(); // Инициализация значения при первой загрузке
  
      return () => {
        window.removeEventListener("resize", throttledResize);
      };
    }, []);
  
    const loadMoreCards = () => {
      setCardsToShow(prevCards => prevCards + 2);
    };
  
    return (
      <section className="movies-card-list">
        <ul className="movies-card-list__section">
          {movies.slice(0, cardsToShow).map((movie) => (
            <MoviesCard
              key={movie.id || movie._id}
              movie={movie}
              pageLocation={pageLocation}
              /* saved={getSavedMovieCard(savedMovies, movie)} */
              isSaved={movie.isSaved}
            />
          ))}
        </ul>
        {cardsToShow < movies.length ? (
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

  /* const [shownMovies, setShownMovies] = useState(0);

  function shownCount() {
    const display = window.innerWidth;
    if (display > 1180) {
      setShownMovies(16);
    } else if (display > 1023) {
      setShownMovies(12);
    } else if (display > 800) {
      setShownMovies(8);
    } else if (display < 800) {
      setShownMovies(5);
    }
  }

  useEffect(() => {
    shownCount();
  }, []);

  function showMore() {
    const display = window.innerWidth;
    if (display > 1180) {
      setShownMovies(shownMovies + 4);
    } else if (display > 1023) {
      setShownMovies(shownMovies + 3);
    }
    else if (display < 1023) {
      setShownMovies(shownMovies + 2);
    }
  } */

  /*   function getSavedMovieCard(savedMovies, movie) {
      return savedMovies.find((savedMovie) => savedMovie.movieId === movie.id);
    } */

 /*  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__section">
        {movies.map((movie) => (
          <MoviesCard
            key={movie.id || movie._id}
            movie={movie}
            pageLocation={pageLocation}
             saved={getSavedMovieCard(savedMovies, movie)} 
            isSaved={movie.isSaved}
          />))}
      </ul>
      {movies.length > shownMovies ? (
      <button
        className="movies-card-list__load-more"
        onClick={showMore}
      >
        Ещё
      </button>) : ('')}
    </section>
  ); */