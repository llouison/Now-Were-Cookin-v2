import { Routes, Route } from 'react-router';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import AddRecipe from './components/AddRecipe';
import RecipeDetail from './components/RecipeDetail';
import EditRecipe from './components/EditRecipe';

const App = () => {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/recipe/:id' element={<RecipeDetail />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/addrecipe' element={<AddRecipe />} />
        <Route path='/editrecipe/:id' element={<EditRecipe />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
