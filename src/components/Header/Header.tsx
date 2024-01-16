import { Link } from 'react-router-dom';
import './Header.scss';

export const Header = () => {
  return (
    <nav className="navbar has-shadow is-dark header">
      <div className="navbar-brand container">
        <Link to="/" className="navbar-item">
          ADMIN.BYKE-BOOKING.COM
        </Link>
      </div>
    </nav>
  );
}
