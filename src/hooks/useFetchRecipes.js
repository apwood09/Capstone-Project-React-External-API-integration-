import { useState, useEffect, useCallback, useRef } from 'react'

// Base URL: TheMealDB API
const API_BASE = 'https://www.themealdb.com/api/json/v1/1'

/* custom hook: fetch API DB recipe */
export default function useFetchRecipes({ type = 'search', query = '', id = null, count = 1 } = {}) {
  // state variables: track fetched data, loading status & error messages
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // persist across re-renders without triggering re-render itself 
  const controllerRef = useRef(null)

  // useCallback: memoizes function so it's recreated every single render
  // only change if one its dependincies change 
  const fetchData = useCallback(async () => {
    // reset state before starting fresh request 
    setLoading(true)
    setError(null)
    setData(null)

    // clean ongoing request: old fetch running, abort immediately
    // prevents race conditions 
    if (controllerRef.current) controllerRef.current.abort()
    // create new AbortController & link signal to current fetch 
    const controller = new AbortController()
    controllerRef.current = controller

    try {
      // CASE 1: fetch single recipe by unique ID
      if (type === 'lookup') {
        const res = await fetch(`${API_BASE}/lookup.php?i=${encodeURIComponent(id)}`, { signal: controller.signal })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const json = await res.json()
        setData(json.meals ? json.meals[0] : null)

      // CASE 2: fetch recipe by text search 
      } else if (type === 'search') {
        const res = await fetch(`${API_BASE}/search.php?s=${encodeURIComponent(query)}`, { signal: controller.signal })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const json = await res.json()
        setData(json.meals || [])
        // CASE 3: fetch random 'count' number of recipes 
      } else if (type === 'random') {
        const calls = Array.from({ length: Math.max(1, count) }, () => fetch(`${API_BASE}/random.php`, { signal: controller.signal }).then(r => {
          if (!r.ok) throw new Error(`HTTP ${r.status}`)
          return r.json()
        }))
        // Promise.all: executes all random fetch request concurrently 
        const results = await Promise.all(calls)
        // Cleans responses, extracts single meal object from each result & filters out null 
        const meals = results.map(r => (r.meals ? r.meals[0] : null)).filter(Boolean)
        setData(meals)
      } else {
        // Fallback if invalid 'type' prop is supplied
        setData(null)
      }
    } catch (err) {
      // error caused by code intentionally abort fetch, ignore 
      // don't show error message for normal cancellation
      if (err.name === 'AbortError') return
      setError(err.message || 'Unknown error')
    } finally {
      // regardless success or failure, turn off loading state
      setLoading(false)
    }
  }, [type, query, id, count])
  // automatically trigger network request when component mounts or when any dependencies change
  useEffect(() => {
    fetchData()
    // Cleanup function: if component unmounts while fetch is still in progress, abort fetch to save bandwidth & prevent memory leaks
    return () => {
      if (controllerRef.current) controllerRef.current.abort()
    }
  }, [fetchData])
  // expose state & manual 'refetch' to any component that consumes this hook
  return { data, loading, error, refetch: fetchData }
}