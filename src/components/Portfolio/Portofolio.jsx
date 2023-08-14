import '../Portfolio/Portfolio.css'

export default function Portfolio() {
  return (
    <section className="portfolio">
      <div className="portfolio__container">
        <h2 className='portfolio__title'>Портфолио</h2>
        <ul className='portfolio__list'>
          <li className='portfolio__item'>
            <a
              className='portfolio__link'
              href='https://github.com/GachiJ/first-project'
              title='Проект - How to learn'
              target='_blank'
              rel='noreferrer'
            >
              Статичный сайт
              <div className="porfolio__link-icon">↗</div>
            </a>
          </li>
          <li className='portfolio__item'>
            <a
              className='portfolio__link'
              href='https://github.com/GachiJ/how-to-learn'
              title='Проект - Russian travel'
              target='_blank'
              rel='noreferrer'
            >
              Адаптивный сайт
              <div className="porfolio__link-icon">↗</div>
            </a>
          </li>
          <li className='portfolio__item'>
            <a
              className='portfolio__link'
              href=' https://gachij.github.io/russian-travel/'
              title='Проект - Mesto'
              target='_blank'
              rel='noreferrer'
            >
              Одностраничное приложение
              <div className="porfolio__link-icon">↗</div>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
};