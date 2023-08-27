import { useLocation } from 'react-router-dom';
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
        {!pageLocation && isSaved && (
          <button
            onClick={onDelete}
            type='button'
            className='movie__button-delete'
          />
        )}

        {pageLocation && (
          isSaved ? (
            <button
              type='button'
              className='movie__button-saved'
            />
          ) : (
            <button
              onClick={onSave}
              type='button'
              className='movie__button-save'
            >
              Сохранить
            </button>
          )
        )}

      </div>
    </article >
  )
}

/* import { useLocation } from 'react-router-dom';
import '../MoviesCard/MoviesCard.css';

export default function MoviesCard({ movie, isSaved, onCardSave, onCardDelete, saved }) {
  const location = useLocation().pathname;
  const pageLocation = location === '/movies';

  const convertMinutesToHours = (minutes) => {
    if (isNaN(minutes) || minutes < 0) {
      return 'Некорректное значение';
    }

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    return `${hours}ч ${remainingMinutes}м`;
  };

  const handleSaveClick = () => {
    if (isSaved) {
      onCardDelete(movie);
    } else {
      onCardSave(movie);
    }
  };

  const renderButton = () => {
    if (pageLocation) {
      if (isSaved) {
        return (
          <button
            onClick={handleSaveClick}
            type='button'
            className='movie__button-delete'
          />
        );
      } else {
        return (
          <button
            onClick={handleSaveClick}
            type='button'
            className={`movie__button-save ${isSaved ? 'movie__button-saved' : ''}`}
          >
            {isSaved ? '' : 'Сохранить'}
          </button>
        );
      }
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
        {renderButton()}
      </div>
    </article>
  );
} */