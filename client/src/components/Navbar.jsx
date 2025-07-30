import React from 'react';
import { Link } from 'react-router';

const Navbar = () => {
  return (
    <nav>
      <div>
        <Link to='/'>
          <h1>Now We're Cookin'</h1>
        </Link>

        <div>
          <Link to='/login'>
            <button>Login</button>
          </Link>
          <Link to='/signup'>
            <button>Signup</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
