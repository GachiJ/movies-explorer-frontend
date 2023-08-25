import '../MoviesCardList/MoviesCardList.css'
/* import { movies } from '../../utils/movies'; */
import MoviesCard from '../MoviesCard/MoviesCard';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function MoviesCardList({ pageLocation, movies, savedMoviesList, onCardSave, onCardDelete, isSaved }) {
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

  function getSavedMovieCard(arr, movie) {
    return arr.find((item) => {
      return item.movieId === (movie.id || movie._id);
    });
  }

  return (
    <section className="movies-card-list">
      {pathname === '/movies' ? (
        <ul className="movies-card-list__section">
          {movies.slice(0, cardsToShow).map((movie) => (
            <MoviesCard
              key={isSaved ? movie.id : movie.movieId}
              movie={movie}
              pageLocation={pageLocation}
              saved={getSavedMovieCard(savedMoviesList, movie)}
              isSaved={isSaved}
              onCardSave={onCardSave}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>) : (
        <ul className="movies-card-list__section">
          {savedMoviesList.map((movie) => (
            <MoviesCard
              key={isSaved ? movie.id : movie.movieId}
              movie={movie}
              pageLocation={pageLocation}
              saved={getSavedMovieCard(savedMoviesList, movie)}
              isSaved={isSaved}
            />
          ))}
        </ul>
      )}
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