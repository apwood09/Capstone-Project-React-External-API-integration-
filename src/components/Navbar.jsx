import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function Navbar() {

// state hook: track user's current search input value
  const [q, setQ] = useState('')

  // init navigation feature: redirect user after form submission 
  const navigate = useNavigate()

// handles form submission: user searches for recipe 
  function submit(e) {
    // prevents default page refresh on submit
    e.preventDefault()
    // safety check: if input is empty OR white space, do nothing
    if (!q.trim()) return
    // redirects: search input page 
    navigate(`/search?q=${encodeURIComponent(q.trim())}`)
    // clears search inout after navigating 
    setQ('')
  }

  return (
    <nav className="nav">
      <div className="nav-container">
        <Link to="/" className="brand">RecipeBox</Link>
        <form onSubmit={submit} className="search-form">
          <input
            aria-label="Search recipes"
            placeholder="Search recipes..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>
    </nav>
  )
}