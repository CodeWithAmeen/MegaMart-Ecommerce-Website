import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faSearch,
  faShoppingCart,
  faUser,
  faTimes,
  faSignOutAlt,
  faCaretDown,
  faTshirt,
  faSuitcase,
  faRunning,
  faChild
} from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../store/authStore';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import './CSS/Navbar.css';

const MySwal = withReactContent(Swal);

const Navbar = () => {
  const { auth, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleMenuToggleClick = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSearchToggleClick = () => {
    setSearchOpen(!searchOpen);
  };

  const handleNavLinkClick = () => {
    setMenuOpen(false);
    setSearchOpen(false);
  };

  const handleLogoutClick = () => {
    MySwal.fire({
      title: 'Are you sure?',
      text: "Do you really want to logout?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Logout',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        MySwal.fire('Logged Out!', 'You have been logged out.', 'success');
      }
    });
  };

  return (
    <nav className="navbar">
      <div className="navbar-top">
        <div className="navbar-phone">
          <span>Phone.no : +123 456 7890</span>
        </div>
        <div className="nav-icons">
          <button className="search-toggle" onClick={handleSearchToggleClick} aria-label="Search">
            <FontAwesomeIcon icon={faSearch} />
          </button>
          <NavLink to="/cart" aria-label="Shopping Cart" onClick={handleNavLinkClick}>
            <FontAwesomeIcon icon={faShoppingCart} />
          </NavLink>

          {auth.isAuthenticated ? (
            <div className="user-info">
              <span className="welcome-message">Welcome, {auth.user?.name}</span>
              <button className="logout-button" onClick={handleLogoutClick} aria-label="Logout">
                <FontAwesomeIcon icon={faSignOutAlt} />
              </button>
            </div>
          ) : (
            <NavLink to="/login" aria-label="Login" onClick={handleNavLinkClick}>
              <FontAwesomeIcon icon={faUser} />
            </NavLink>
          )}
        </div>
      </div>

      <div className="navbar-bottom">
        <div className="navbar-logo">
          <NavLink to="/" onClick={handleNavLinkClick}>
            <img src="images/Logo.png" alt="Logo" />
          </NavLink>
        </div>
        <button className="menu-toggle" onClick={handleMenuToggleClick} aria-label="Toggle menu">
          <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} className="menu-icon" />
        </button>
        <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <NavLink to="/" onClick={handleNavLinkClick} activeClassName="active">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/about" onClick={handleNavLinkClick} activeClassName="active">About</NavLink>
          </li>
          <li className="nav-item dropdown">
            <NavLink to="/mens-wear" onClick={handleNavLinkClick} activeClassName="active">
              Men's Wear <FontAwesomeIcon icon={faCaretDown} />
            </NavLink>
            <div className="dropdown-content">
              <NavLink to="/mens-casual" onClick={handleNavLinkClick} activeClassName="active">
                <FontAwesomeIcon icon={faTshirt} /> Casual
              </NavLink>
              <NavLink to="/mens-formal" onClick={handleNavLinkClick} activeClassName="active">
                <FontAwesomeIcon icon={faSuitcase} /> Formal
              </NavLink>
              <NavLink to="/mens-sportswear" onClick={handleNavLinkClick} activeClassName="active">
                <FontAwesomeIcon icon={faRunning} /> Sportswear
              </NavLink>
            </div>
          </li>
          <li className="nav-item dropdown">
            <NavLink to="/womens-wear" onClick={handleNavLinkClick} activeClassName="active">
              Women's Wear <FontAwesomeIcon icon={faCaretDown} />
            </NavLink>
            <div className="dropdown-content">
              <NavLink to="/womens-casual" onClick={handleNavLinkClick} activeClassName="active">
                <FontAwesomeIcon icon={faTshirt} /> Casual
              </NavLink>
              <NavLink to="/womens-formal" onClick={handleNavLinkClick} activeClassName="active">
                <FontAwesomeIcon icon={faSuitcase} /> Formal
              </NavLink>
              <NavLink to="/womens-activewear" onClick={handleNavLinkClick} activeClassName="active">
                <FontAwesomeIcon icon={faRunning} /> Activewear
              </NavLink>
            </div>
          </li>
          <li className="nav-item dropdown">
            <NavLink to="/kids-wear" onClick={handleNavLinkClick} activeClassName="active">
              Kid's Wear <FontAwesomeIcon icon={faCaretDown} />
            </NavLink>
            <div className="dropdown-content">
              <NavLink to="/kids-casual" onClick={handleNavLinkClick} activeClassName="active">
                <FontAwesomeIcon icon={faTshirt} /> Casual
              </NavLink>
              <NavLink to="/kids-formal" onClick={handleNavLinkClick} activeClassName="active">
                <FontAwesomeIcon icon={faSuitcase} /> Formal
              </NavLink>
              <NavLink to="/kids-playwear" onClick={handleNavLinkClick} activeClassName="active">
                <FontAwesomeIcon icon={faChild} /> Playwear
              </NavLink>
            </div>
          </li>
          <li className="nav-item dropdown">
            <NavLink to="/sales-offers" onClick={handleNavLinkClick} activeClassName="active">Sales/Offers</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/contact" onClick={handleNavLinkClick} activeClassName="active">Contact</NavLink>
          </li>
        </ul>
      </div>

      {searchOpen && (
        <div className="search-bar">
          <input type="text" placeholder="Search products..." />
          <button type="button">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
