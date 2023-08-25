import { useLocation } from 'react-router-dom';
import '../MoviesCard/MoviesCard.css'


export default function MoviesCard({ movie, isSaved, onCardSave, onCardDelete, saved }) {
  /*  const currentLocation = useLocation();
 
   const handleBookmarkClick = () => onBookmark(movie);
   const handleDeleteClick = () => onDelete(movie); */
  const location = useLocation().pathname;

  const pageLocation = location === '/movies';

  function onSave() {
    onCardSave(movie)
  }

  function onDelete() {
    onCardDelete(movie);
  }

  const convertMinutesToHours = (minutes) => {
    if (isNaN(minutes) || minutes < 0) {
      return 'Некорректное значение';
    }

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    return `${hours}ч ${remainingMinutes}м`;
  }
  const buttonType = () => {
    if (pageLocation && !isSaved) {
      return (
        <button
          onClick={onSave}
          type='button'
          className='movie__button-save'
        >Сохранить</button>
      );
    }
    if (pageLocation && isSaved && saved) {
      return (
        <button
          type='button'
          className='movie__button-saved'
        />
      );
    }
  };

  return (
    <article className='movie'>
      <img
        src={isSaved ? movie.image : `https://api.nomoreparties.co/${movie.image.url}`}
        alt={movie.name}
        className='movie__image'
      />
      <div className='movie__description'>
        <div className='movie__container'>
          <h2 className='movie__name'>{movie.nameRU}</h2>
          <span className='movie__duration'>{convertMinutesToHours(movie.duration)}</span>
        </div>
        {isSaved ? (
          <button
            onClick={onDelete}
            type='button'
            className='movie__button-delete'
          />
        ) : (
          buttonType()
        )}


      </div>
    </article>
  )
}