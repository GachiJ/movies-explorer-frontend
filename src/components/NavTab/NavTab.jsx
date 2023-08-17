import '../NavTab/NavTab.css'

export default function NavTab() {
  return (
    <section className="nav">
      <nav className="nav__menu">
        <a href="#project" className="nav__link">О проекте</a>
        <a href="#tech" className="nav__link">Технологии</a>
        <a href="#student" className="nav__link">Студент</a>
      </nav>
    </section>
  );
}