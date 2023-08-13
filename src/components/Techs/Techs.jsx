import '../Techs/Techs.css'

export default function Techs() {
  return (
    <section className="techs" id='tech'>
      <div className="techs__container">
        <h2 className="techs__title">Технологии</h2>
        <h2 className="techs__subtitle">7 технологий</h2>
        <p className="techs__description">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        <ul className='techs__list'>
          <li className='techs__item'>
            <p className='techs__name'>HTML</p>
          </li>
          <li className='techs__item'>
            <p className='techs__name'>CSS</p>
          </li>
          <li className='techs__item'>
            <p className='techs__name'>JS</p>
          </li>
          <li className='techs__item'>
            <p className='techs__name'>React</p>
          </li>
          <li className='techs__item'>
            <p className='techs__name'>Git</p>
          </li>
          <li className='techs__item'>
            <p className='techs__name'>Express.js</p>
          </li>
          <li className='techs__item'>
            <p className='techs__name'>mongoDB</p>
          </li>
        </ul>
      </div>
    </section>
  )
}