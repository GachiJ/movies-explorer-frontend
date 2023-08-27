/* import { useLocation } from 'react-router-dom';
import '../MoviesCard/MoviesCard.css'


export default function MoviesCard({ movie, isSaved, onCardSave, onCardDelete, saved }) {

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
        <div className="movie__button-container">
          {pageLocation && (
            <button
              onClick={onSave}
              type="button"
              className={`movie__button-save ${isSaved ? 'movie__button-save_active' : ''}`}
            >
              {isSaved ? null : 'Сохранить'}
            </button>
          )}
          {!pageLocation && isSaved && (
            <button
              onClick={onDelete}
              type="button"
              className="movie__button-delete"
            />
          )}
        </div>
      </div>
    </article >
  )
} */

import { useLocation } from 'react-router-dom';
import '../MoviesCard/MoviesCard.css';

export default function MoviesCard({ movie, isSaved, onCardSave, onCardDelete, saved, savedMoviesList }) {
  const location = useLocation();

  const convertMinutesToHours = (minutes) => {
    if (isNaN(minutes) || minutes < 0) {
      return 'Некорректное значение';
    }

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    return `${hours}ч ${remainingMinutes}м`;
  };


  function onCardClick() {
    if (saved) {
      onCardDelete(savedMoviesList.filter((m) => m.movieId === movie.id)[0]);
    } else {
      onCardSave(movie);
    }
  }

  function onDelete() {
    onCardDelete(movie);
  }

  const cardSaveButtonClassName = `${saved ? 'movie__button-save movie__button-save_active' : 'movie__button-save'
    }`;

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
          <button type="button" className="movie__button-delete" onClick={onDelete}></button>
        ) : (
          <button type="button" className={cardSaveButtonClassName} onClick={onCardClick}></button>
        )}
      </div>
    </article>
  );
}