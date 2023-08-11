import '../Portfolio/Portfolio.css'
import Arrow from '../../images/arrow.svg'

export default function Portfolio() {
  return (
    <section className="portfolio">
      <div className="portfolio__container">
        <h2 className='portfolio__title'>Портфолио</h2>
        <ul className='portfolio__list'>
          <li className='portfolio__item'>
            <a
              className='portfolio__link'
              href='#'
              title='Проект - How to learn'
              target='_blank'
              rel='noreferrer'
            >
              Статичный сайт
              <img src={Arrow} alt="" className="porfolio__link-icon" />
            </a>
          </li>
          <li className='portfolio__item'>
            <a
              className='portfolio__link'
              href='#'
              title='Проект - Russian travel'
              target='_blank'
              rel='noreferrer'
            >
              Адаптивный сайт
              <img src={Arrow} alt="" className="porfolio__link-icon" />
            </a>
          </li>
          <li className='portfolio__item'>
            <a
              className='portfolio__link'
              href='#'
              title='Проект - Mesto'
              target='_blank'
              rel='noreferrer'
            >
              Одностраничное приложение
              <img src={Arrow} alt="" className="porfolio__link-icon" />
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
};