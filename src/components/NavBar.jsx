import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.svg';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Programs', path: '/programs' },
  { label: 'Resources', path: '/resources' },
  { label: 'Volunteer', path: '/volunteer' },
];

function NavBar() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <NavLink to="/" className="brand" aria-label="EMPOWERment Inc home">
          <img src={logo} alt="EMPOWERment Inc" className="brand__logo" />
          <div>
            <p className="brand__eyebrow">EMPOWERment Inc</p>
            <p className="brand__tagline">Advocating for affordable, thriving communities</p>
          </div>
        </NavLink>
        <nav aria-label="Primary navigation">
          <ul className="nav-list">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    isActive ? 'nav-link nav-link--active' : 'nav-link'
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <a className="cta-button" href="#volunteer-form">
          Donate / Volunteer
        </a>
      </div>
    </header>
  );
}

export default NavBar;
