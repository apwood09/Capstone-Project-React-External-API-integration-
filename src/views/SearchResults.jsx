import React from 'react'
import { useLocation } from 'react-router-dom'
import useFetchRecipes from '../hooks/useFetchRecipes'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import RecipeCard from '../components/RecipeCard'

/**
 * custom helper hook to parse URL query parameters
 * utilizes native web 'URLSearchParams' API on top of React Router's 'useLocation().search'
 */
function useQuery() {
  return new URLSearchParams(useLocation().search)
}

export default function SearchResults() {
  // extract specific 'q' parameter from query string
  // fallback to empty string if '?q=' doesn't exist in URL
  const q = useQuery().get('q') || ''

  // pass the extracted search term directly into our custom data-fetching hook
  // whenever 'q' changes (e.g., the user searches for something else), the hook's internal useEffect triggers a fresh API fetch automatically
  const { data, loading, error, refetch } = useFetchRecipes({ type: 'search', query: q })

  return (
    <div className="search-results container">
      <h2>Search Results {q ? `for "${q}"` : ''}</h2>

      {loading && <LoadingSpinner />}
      {error && <ErrorMessage>{error}</ErrorMessage>}

      <div className="grid">
        {Array.isArray(data) && data.map(r => (
          <RecipeCard key={r.idMeal} recipe={r} />
        ))}
      </div>

      {!loading && !error && (!Array.isArray(data) || data.length === 0) && (
        <p>No results found. Try a different search term.</p>
      )}

      <div style={{ marginTop: '1rem' }}>
        <button className="btn" onClick={() => refetch()} disabled={loading}>Refetch</button>
      </div>
    </div>
  )
}
