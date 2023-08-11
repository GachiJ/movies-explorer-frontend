import '../MoviesCardList/MoviesCardList.css'
import { movies } from '../../utils/movies';
import MoviesCard from '../MoviesCard/MoviesCard';

export default function MoviesCardList({ pageLocation }) {
  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__section">
        {movies.map((movie) => (
          <MoviesCard
            key={movie.id || movie._id}
            movie={movie}
            pageLocation={pageLocation}
            isSaved={movie.isSaved}
          />))}
      </ul>
      <button
        className="movies-card-list__load-more"
      >
        Ещё
      </button>
    </section>
  );
};