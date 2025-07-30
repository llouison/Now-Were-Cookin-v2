import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [category, setCategory] = useState('All');

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
    <div>
      <div>
        {categories.map((cat) => (
          <button
            onClick={() => setCategory(cat)}
            key={cat}
            className={`${category === cat ? 'categorySelected' : 'category'}`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div>
        {recipes.map((recipe) => (
          <div key={recipe._id}>
            {recipe.photoUrl && (
              <img src={recipe.photoUrl} alt={recipe.title} />
            )}
            <div>
              <h2>{recipe.title}</h2>
              <p>{recipe.category}</p>
              <p>{recipe.cookTime}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
