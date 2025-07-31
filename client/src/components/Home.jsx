import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [category, setCategory] = useState('All');
  const { user } = useContext(AuthContext);

  const categories = [
    'All',
    'Breakfast',
    'Lunch',
    'Dinner',
    'Dessert',
    'Snack',
  ];

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const res = await axios.get(
          `api/recipes/${
            category && category !== 'All' ? `?category=${category}` : ''
          }`
        );
        setRecipes(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getRecipes();
  }, [category]);

  return (
    <div className='fullWidth'>
      <div className='catContainer'>
        {categories.map((cat) => (
          <a
            onClick={() => setCategory(cat)}
            key={cat}
            className={`${category === cat ? 'current' : 'category'}`}
          >
            {cat}
          </a>
        ))}
      </div>
      <div className='container'>
        <h1 className='primary'>Recipes</h1>
        <hr />
        {recipes.map((recipe) => (
          <Link to={`/recipe/${recipe._id}`} key={recipe._id}>
            <div className='polaroid single index'>
              <div className='polaroid_photo'>
                {recipe.photoUrl && (
                  <img src={recipe.photoUrl} alt={recipe.title} />
                )}
              </div>
              <div className='polaroid_content'>
                <h1 className='secondary recipe_title'>{recipe.title}</h1>
                <h2 className='tertiary'>
                  {`a ${recipe.cookTime} minute ${recipe.category} by: ${recipe.author}`}
                </h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
