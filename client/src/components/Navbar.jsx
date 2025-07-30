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
    <nav>
      <div>
        <Link to='/'>
          <h1>Now We're Cookin'</h1>
        </Link>

        <div>
          {user ? (
            <div>
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <>
              <Link to='/login'>
                <button>Login</button>
              </Link>
              <Link to='/signup'>
                <button>Signup</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
