import '../Footer/Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <h2 className='footer__title'>
          Учебный проект Яндекс.Практикум х BeatFilm.
        </h2>
        <div className='footer__navigation'>
          <ul className='footer__links'>
            <li>
              <a
                className='footer__link'
                href='https://practicum.yandex.ru/'
                target='_blank'
                rel='noreferrer'
                title='Яндекс Практикум'
              >
                Яндекс.Практикум
              </a>
            </li>
            <li>
              <a
                className='footer__link'
                href='https://github.com/GachiJ'
                target='_blank'
                rel='noreferrer'
                title='GitHub'
              >
                Github
              </a>
            </li>
          </ul>
          <p className='footer__copyright'>&copy; {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
};