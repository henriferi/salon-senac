import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <nav>
        <ul className="menu">
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/about">Sobre Nós</Link></li>
          <li><Link to="/feedback">Feedback Premiado</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
