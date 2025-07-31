import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const EditRecipe = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    cookTime: '',
    photoUrl: '',
    ingredients: [''],
    instructions: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState('');
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index] = value;
    handleInputChange('ingredients', newIngredients);
    const lastIngredient =
      formData.ingredients[formData.ingredients.length - 1];
    if (error && lastIngredient.trim() !== '') {
      setError('');
    }
  };

  const addIngredient = () => {
    const lastIngredient =
      formData.ingredients[formData.ingredients.length - 1];
    if (lastIngredient.trim() !== '') {
      setError('');
      handleInputChange('ingredients', [...formData.ingredients, '']);
    } else {
      setError('Please fill out previous ingredient');
    }
  };

  const removeIngredient = (index) => {
    console.log(formData.ingredients, index);
    if (formData.ingredients.length > 1) {
      const newIngredients = formData.ingredients.filter((_, i) => i !== index);
      handleInputChange('ingredients', newIngredients);
      const lastIngredient =
        formData.ingredients[formData.ingredients.length - 1];
      if (error && lastIngredient.trim() !== '') {
        setError('');
      }
    }
  };

  const handleSubmit = async (e) => {
    console.log('handling submit');
    e.preventDefault();
    setError('');
    setLoading(true);
    console.log(formData);

    try {
      await axios.put(`/api/recipes/${id}`, {
        title: formData.title,
        category: formData.category,
        cookTime: Number(formData.cookTime),
        ingredients: formData.ingredients,
        instructions: formData.instructions,
        photoUrl: formData.photoUrl,
      });
      navigate('/');
    } catch (err) {
      setError('Failed to edit recipe');
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getRecipe = async () => {
      try {
        const res = await axios.get(`/api/recipes/${id}`);
        setFormData({
          title: res.data.title,
          category: res.data.category,
          cookTime: Number(res.data.cookTime),
          ingredients: res.data.ingredients,
          instructions: res.data.instructions,
          photoUrl: res.data.photoUrl,
        });
      } catch (err) {
        console.log(err);
      }
    };
    getRecipe();
  }, [id]);

  if (!formData) {
    return <div>Loading data...</div>;
  }

  return (
    <div className='container'>
      <h1 className='primary'>Edit Recipe</h1>
      <hr />
      <form className='input_form' id='input_form' onSubmit={handleSubmit}>
        <div className='recipeform_container'>
          <div className='polaroid single'>
            <div className='polaroid_photo'>
              <img src={formData.photoUrl} alt={formData.title} />
            </div>
            {/* <div class='polaroid_content'>
            <label for='photourl' class='title'>Photo Url:<input name='photourl' id='photourl' type='text' value='<%= recipe.photo %>' /></label></br>
        </div> */}
          </div>
          <label htmlFor='title' className='title'>
            Title:
            <input
              type='text'
              name='title'
              id='title'
              className='form'
              required
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
            />
          </label>
          <label htmlFor='category' className='title'>
            Category:
            <select
              className='category_type'
              id='category'
              onChange={(e) => handleInputChange('category', e.target.value)}
              value={formData.category}
              required
            >
              <option value='' disabled>
                Choose Category
              </option>
              <option value='Breakfast'>Breakfast</option>
              <option value='Lunch'>Lunch</option>
              <option value='Dinner'>Dinner</option>
              <option value='Dessert'>Dessert</option>
              <option value='Snack'>Snack</option>
            </select>
          </label>
          <label htmlFor='cooking_time' className='title'>
            Cooking Time:
            <input
              name='cooking_time'
              id='cooking_time'
              className='form'
              type='number'
              placeholder=' in minutes'
              required
              value={formData.cookTime}
              onChange={(e) => handleInputChange('cookTime', e.target.value)}
            />
          </label>
          <p className='title'>Ingredients</p>
          {formData.ingredients.map((ingredient, index) => (
            <div key={index}>
              {/* <label htmlFor={`ingredient${index + 1}`}> */}
              <input
                type='text'
                name={`ingredient${index + 1}`}
                id={`ingredient${index + 1}`}
                required
                placeholder={'Enter Ingredient'}
                value={ingredient}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
              />
              {/* </label> */}
              {formData.ingredients.length > 1 && (
                <button type='button' onClick={() => removeIngredient(index)}>
                  Remove
                </button>
              )}
            </div>
          ))}
          <button type='button' onClick={addIngredient}>
            Add Ingredient
          </button>
          <label htmlFor='description' className='title'>
            Instructions:
            <br />
            <textarea
              type='text'
              name='description'
              id='description'
              className='form'
              placeholder='Tell us about your recipe here...'
              rows='4'
              cols='50'
              required
              value={formData.instructions}
              onChange={(e) =>
                handleInputChange('instructions', e.target.value)
              }
            />
            <br />
          </label>
          <label htmlFor='photoUrl' className='title'>
            Photo Url:
            <input
              id='photoUrl'
              type='text'
              required
              value={formData.photoUrl}
              onChange={(e) => handleInputChange('photoUrl', e.target.value)}
            />
          </label>
          <button className='button' id='submit1' disabled={loading}>
            {loading ? 'Updating...' : 'Edit Recipe'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRecipe;
