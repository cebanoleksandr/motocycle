import { Link, NavLink } from 'react-router-dom';
import './Footer.scss';

export const Footer = () => {
  return (
    <footer className="footer-style">
      <div className="container has-text-right">
        <Link to="/contacts" className="is-size-5 footer-link">
          Developer: Oleksandr Cheban
        </Link>
      </div>
    </footer>
  );
}
