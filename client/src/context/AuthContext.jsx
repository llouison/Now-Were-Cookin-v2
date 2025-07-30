import { useEffect, useState, createContext } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  /* This allows our components to know the context value: user or null */
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      //if token is found, set token as authorization header in all future api requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      axios.get('/api/user/me').then((res) => {
        setUser(res.data);
      });
    }
  }, []);

  const login = async (username, password) => {
    const res = await axios.post('/api/user/login', {
      username,
      password,
    });
    localStorage.setItem('token', res.data.token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
    setUser(res.data);
  };

  const signup = async (username, password) => {
    const res = await axios.post('/api/user/signup', {
      username,
      password,
    });
    localStorage.setItem('token', res.data.token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
    setUser(res.data);
  };

  const logout = async (username, password) => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
