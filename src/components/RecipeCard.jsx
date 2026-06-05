import React from 'react'
// client-side routing: nav without page refreah 
import { Link } from 'react-router-dom'

// functional component: recipe object as prop -> display recipe info
export default function RecipeCard({ recipe }) {
    // recipie not found: return null 
  if (!recipe) return null
  // extracts specific unique ids from recipe object
  const id = recipe.idMeal
  return (
    <article className="recipe-card">
      <Link to={`/recipe/${id}`} className="card-link">
        <img src={recipe.strMealThumb} alt={recipe.strMeal} />
        <div className="card-body">
          <h3>{recipe.strMeal}</h3>
          <p className="category">{recipe.strCategory || ''}</p>
        </div>
      </Link>
    </article>
  )
}
