import React from 'react'
import useFetchRecipes from '../hooks/useFetchRecipes'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import RecipeCard from '../components/RecipeCard'

export default function Home() {
  // useFetchRecipes custom hook fetch random recipes for featured section
  // configed to fetch 6 random recipes on initial load 
  // extract: data, loading state, error state & manual 'refetch'
  const { data, loading, error, refetch } = useFetchRecipes({ type: 'random', count: 6 })

  return (
    <div className="home container">
      {/* Hero Section: welcomes user & hosts refresh trigger */}
      <header className="hero">
        <div className="hero-inner">
          <h1>Welcome to RecipeBox</h1>
          <p>Discover dishes from around the world. Search or explore featured recipes below.</p>
          <div>
            {/* Manual Refetch Button: calls hook's refetch function (loads 6 new random recipes).
                Disables itself while loading to prevent accidental double-clicks & spamming the API */}
            <button className="btn" onClick={() => refetch()} disabled={loading}>
              {loading ? 'Refreshing...' : 'Refresh featured'}
            </button>
          </div>
        </div>
      </header>
      {/* main content */}
      <section className="featured">
        <h2>Featured Recipes</h2>
        {/* CONDITIONAL RENDERING 1: loading is true, display visual spinner */}
        {loading && <LoadingSpinner />}

        {/* CONDITIONAL RENDERING 2: error exists, pass error string into the ErrorMessage component */}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        {/* CONDITIONAL RENDERING 3: core data layout */}
        <div className="grid">
          {Array.isArray(data) && data.map(recipe => (
            <RecipeCard key={recipe.idMeal} recipe={recipe} />
          ))}
        </div>
        
        {/* CONDITIONAL RENDERING 4: empty state
            done loading, data successfully an array, contains zero items. */}
        {!loading && Array.isArray(data) && data.length === 0 && (
          <p>No featured recipes available right now.</p>
        )}
      </section>
    </div>
  )
}
