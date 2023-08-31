import '../MoviesCard/MoviesCard.css';

export default function MoviesCard({ movie, isSaved, onCardSave, onCardDelete, saved, savedMoviesList }) {

  const convertMinutesToHours = (minutes) => {
    if (isNaN(minutes) || minutes < 0) {
      return 'Некорректное значение';
    }

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    return `${hours}ч ${remainingMinutes}м`;
  };


  function onCardClick() {
    console.log(saved)
    if (saved) {
      onCardDelete(savedMoviesList.filter((m) => m.movieId === movie.id)[0]);
    } else {
      onCardSave(movie);
    }
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
          <button type="button" className="movie__button-delete" onClick={onCardClick}></button>
        ) : (
          <button type="button" className={cardSaveButtonClassName} onClick={onCardClick}>{saved ? null : 'Сохранить'}</button>
        )}
      </div>
    </article>
  );
}