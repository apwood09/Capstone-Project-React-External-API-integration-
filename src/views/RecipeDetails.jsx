import React from 'react'
import { useParams } from 'react-router-dom'
import useFetchRecipes from '../hooks/useFetchRecipes'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'

/**
 * helper function to normalize TheMealDB's flat API data structure.
 * API provides ingredients & measurements: separate flat keys
 * (strIngredient1, strMeasure1, up to 20): utility combines them
 * into clean, iterable array of objects
 */
function extractIngredients(recipe) {
  if (!recipe) return []
  const items = []

  // loop through 20 possible ingredients/measurements, extract non-empty into array {ing, measure} objects
  for (let i = 1; i <= 20; i++) {
    const ing = recipe[`strIngredient${i}`]
    const measure = recipe[`strMeasure${i}`]

    // only push to array if ingredient exists & isn't only whitespace 
    if (ing && ing.trim()) items.push({ ing: ing.trim(), measure: (measure || '').trim() })
  }
  return items
}

export default function RecipeDetails() {
  // pulls dynamoc :id varaible out of active browser URL
  const { id } = useParams()
  // look up feature of custom hook, aliasing returned 'data' as 'recipe' 
  const { data: recipe, loading, error } = useFetchRecipes({ type: 'lookup', id })
  // processes raw recipe object into clean ingredients list array
  const ingredients = extractIngredients(recipe)

  return (
    <div className="recipe-details container">
      {/* visual status indicators */}
      {loading && <LoadingSpinner />}
      {error && <ErrorMessage>{error}</ErrorMessage>}

      {/* main recipe content: runs only when recipe object is successfully loaded */}
      {recipe && (
        <article>
          <h2>{recipe.strMeal}</h2>
          <img src={recipe.strMealThumb} alt={recipe.strMeal} />
          <p className="meta">{recipe.strCategory} • {recipe.strArea}</p>

          <h3>Ingredients</h3>
          {/* displays step-by-step cooking preparation text */}
          <ul className="ingredients">
            {ingredients.map((it, idx) => (
              <li key={idx}>{it.measure} {it.ing}</li>
            ))}
          </ul>

          <h3>Instructions</h3>
          <div className="instructions">{recipe.strInstructions}</div>
        </article>
      )}
      {/* fallback empty state: finished loading, no error occurred, but no recipe matched the ID */}
      {!loading && !recipe && !error && (
        <p>Recipe not found.</p>
      )}
    </div>
  )
}
