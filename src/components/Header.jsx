import { Link } from 'react-router-dom';
import { FaHome, FaInfoCircle, FaCommentDots } from 'react-icons/fa'; 
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <nav>
        <ul className="menu">
          <li>
            <Link to="/home">
              <FaHome className="icon" size="2em" color="white" /> Home
            </Link>
          </li>
          <li>
            <Link to="/about">
              <FaInfoCircle className="icon" size="2em" color="white" /> Sobre Nós
            </Link>
          </li>
          <li>
            <Link to="/feedback">
              <FaCommentDots className="icon" size="2em" color="white" /> Feedback Premiado
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
