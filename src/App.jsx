import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './views/Home'
import SearchResults from './views/SearchResults'
import RecipeDetails from './views/RecipeDetails'

export default function App() {
  return (
    <div className="app-root">
      {/* Navbar: placed outside of the <Routes> container (remains permanently visible on the screen, regardless of which page the user navigates to) */}
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
        </Routes>
      </main>
    </div>
  )
}
