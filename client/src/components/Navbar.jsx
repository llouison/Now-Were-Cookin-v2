import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  return (
    <header>
      <Link to='/'>
        <h3 className='logo' id='top'>
          Now We're Cookin'
        </h3>
      </Link>
      <nav>
        {user ? (
          <>
            <li>
              <Link to='/addrecipe'>Add Recipe</Link>
            </li>
            <li>
              <a onClick={handleLogout}>Logout</a>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to='/login'>Login</Link>
            </li>
            <li>
              <Link to='/signup'>Signup</Link>
            </li>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
