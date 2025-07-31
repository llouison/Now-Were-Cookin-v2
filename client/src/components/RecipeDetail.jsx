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
    <div className='container recipeform_container'>
      <div className='polaroid single'>
        <div className='polaroid_photo'>
          <img src={recipe.photoUrl} alt={recipe.title} />
        </div>
        <div className='polaroid_content'>
          <h1 className='individ recipe_title'>{recipe.title}</h1>
        </div>
      </div>
      <div className='description'>
        <p>
          <span className='title'>Author: </span>
          {recipe.author}
        </p>
        <p>
          <span className='title'>Category: </span> {recipe.category}
        </p>
        <p>
          <span className='title'>Cook Time: </span> {recipe.cookTime} minutes
        </p>
        <span className='title'>Ingredients: </span>
        {/* <ul> */}
        {recipe.ingredients.map((ingredient, index) => (
          <p key={index}>- {ingredient}</p>
        ))}
        {/* </ul> */}
        <p className='description_text'>
          <span className='title'>Instructions: </span>
          <br />
          {recipe.instructions}
        </p>
      </div>
      {user && user._id === recipe.createdBy && (
        <div>
          <Link to={`/editrecipe/${id}`}>
            <button className='button'>Edit</button>
          </Link>

          <button className='button' onClick={handleDelete}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default RecipeDetail;
