import SearchForm from '../SearchForm/SearchForm';
/* import Preloader from '../Preloader/Preloader'; */
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import '../Movies/Movies.css';

export default function Movies({ pageLocation }) {
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