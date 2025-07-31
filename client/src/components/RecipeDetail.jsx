import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router';

const RecipeDetail = (props) => {
  const [recipe, setRecipe] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/recipes/${id}`);
      navigate('/');
    } catch (err) {
      console.log('error deleting recipe', err);
    }
  };

  useEffect(() => {
    const getRecipe = async () => {
      console.log('in recipe datail');
      try {
        const res = await axios.get(`/api/recipes/${id}`);
        setRecipe(res.data);
        if (user && user._id === res.data.author) {
          setIsDisabled(false);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getRecipe();
  }, [id, user]);

  if (!recipe) {
    return <div>Loading data...</div>;
  }
  console.log('user:', user, 'recipe', recipe);

  return (
    <div>
      <img src={recipe.photoUrl} alt={recipe.title} />
      <h1>{recipe.title}</h1>
      <p>Category: {recipe.category}</p>
      <p>CookTime: {recipe.cookTime} minutes</p>
      <h2>Ingredients</h2>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h2>Instructions</h2>
      <p>{recipe.instructions}</p>
      <div>
        <Link to={`/editrecipe/${id}`}>
          <button disabled={isDisabled}>Edit</button>
        </Link>

        <button onClick={handleDelete} disabled={isDisabled}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default RecipeDetail;
