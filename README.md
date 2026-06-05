RecipeBox — React External API Integration (Capstone)
A small React application demonstrating integration with an external API (TheMealDB), client-side state handling for loading and errors, and a simple multi-view UI.

Features

    Dynamic fetches: search meals, lookup by id, show random featured meals

    Reusable useFetchRecipes hook handling loading, errors, abort, and refetch

    Three main views: Home (featured), Search Results, Recipe Details

    Responsive grid layout and accessible UI components


Getting started Requirements: Node.js 18+ and npm

    Install
    npm install

    Run development server
    npm run dev

    Build for production
    npm run build

    Preview production build
    npm run preview

API

This project uses TheMealDB (https://www.themealdb.com/api.php). No API key required for endpoints used.

Project structure

index.html — Vite entry file that mounts #root

main.jsx — app entry that bootstraps React and the router

App.jsx — top-level routes and layout

useFetchRecipes.js — data fetching hook that supports search, lookup, random

Home.jsx — landing page with featured/random recipes

SearchResults.jsx — search results page reading ?q= query param

RecipeDetails.jsx — recipe details view with ingredients & instructions

components — UI components (Navbar, RecipeCard, LoadingSpinner, ErrorMessage)

styles — CSS files

