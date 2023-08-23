import '../MoviesCard/MoviesCard.css'


export default function MoviesCard({ movie, pageLocation, isSaved }) {
 /*  const currentLocation = useLocation();

  const handleBookmarkClick = () => onBookmark(movie);
  const handleDeleteClick = () => onDelete(movie); */

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
          type='button'
          className='movie__button-save button-hover'
       >Сохранить</button>
      );
    }
    if (pageLocation && isSaved) {
      return (
        <button
          type='button'
          className='movie__button-saved button-hover'
        />
      );
    }
    if (!pageLocation && isSaved) {
      return (
        <button
          type='button'
          className='movie__button-delete button-hover'
        />
      )
    }
  };

  return (
    <article className='movie'>
      <img
        src={movie.image.url}
        alt={movie.name}
        className='movie__image'
      />
      <div className='movie__description'>
        <div className='movie__container'>
          <h2 className='movie__name'>{movie.nameRU}</h2>
          <span className='movie__duration'>{convertMinutesToHours(movie.duration)}</span>
        </div>
        {buttonType()}
      </div>
    </article>
  )
}