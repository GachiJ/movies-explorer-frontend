import MoviesCardList from '../MoviesCardList/MoviesCardList';
import '../SavedMovies/SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';

export default function SavedMovies({ pageLocation }) {
  return (
    <main className="main">
      <SearchForm />
      {/*   <Preloader /> */}
      <MoviesCardList
        pageLocation={pageLocation}
      />
    </main>
  );
};