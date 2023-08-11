import '../NotFound/NotFound.css';

export default function NotFound() {
  return(
    <div className="not-found">
    <div className="not-found__container">
      <span className="not-found__error-number">404</span>
      <span className="not-found__error-name">Страница не найдена</span>
    </div>
    <button className="not-found__button">
      Назад
    </button>
  </div>
  );
};