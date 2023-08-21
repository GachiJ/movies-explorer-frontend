import '../MoviesCardList/MoviesCardList.css'
/* import { movies } from '../../utils/movies'; */
import MoviesCard from '../MoviesCard/MoviesCard';
import { useEffect, useState } from 'react';

export default function MoviesCardList({ pageLocation, movies, savedMovies }) {

  const [shownMovies, setShownMovies] = useState(0);

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
    // else if (display > 800) {
    //   setShownMovies(shownMovies + 2);
    // }
    else if (display < 1023) {
      setShownMovies(shownMovies + 2);
    }
  }

  function getSavedMovieCard(savedMovies, movie) {
    return savedMovies.find((savedMovie) => savedMovie.movieId === movie.id);
  }

  return (
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
      <button
        className="movies-card-list__load-more"
        onClick={showMore}
      >
        Ещё
      </button>
    </section>
  );
};