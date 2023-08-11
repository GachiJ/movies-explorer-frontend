import SearchForm from '../SearchForm/SearchForm';
/* import Preloader from '../Preloader/Preloader'; */
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import '../Movies/Movies.css';

export default function Movies({ pageLocation }) {
  return (
    <>
      <SearchForm />
      {/*   <Preloader /> */}
      <MoviesCardList
        pageLocation={pageLocation}
      />
      <Footer />
    </>
  );
};