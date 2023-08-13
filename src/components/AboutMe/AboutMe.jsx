import '../AboutMe/AboutMe.css';
import Me from '../../images/Практикум.jpg'

export default function AboutMe() {
  return (
    <section className="about-me" id='student'>
      <div className="about-me__container">
        <h2 className="about-me__title">Студент</h2>
        <div className="about-me__info-container">
          <img src={Me} alt="Моя фотография" className="about-me__photo" />
          <h3 className='about-me__name'>Никита</h3>
          <p className='about-me__age'>Фронтенд-разработчик, 22 года</p>
          <p className='about-me__text'>
            Родился и вырос в наукограде Фрязино. Закончил факультет "Информационных систем и технологий" в Технологическом университете с отличием.
            Активно занимаюсь спортом и параллельно увлекаюсь программированием. После окончания университета устроился работать дежурным инженером в компании ПАО «Ростелеком».
            По завершению курса веб-разработки планирую развиваться в сфере фриланса.
          </p>
          <a
            className='about-me__link'
            href='https://github.com/GachiJ'
            target='_blank'
            rel='noreferrer'
            title='GitHub'
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
};