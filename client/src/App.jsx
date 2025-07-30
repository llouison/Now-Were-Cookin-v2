import { Routes, Route } from 'react-router';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import AddRecipe from './components/AddRecipe';

const App = () => {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/addrecipe' element={<AddRecipe />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
