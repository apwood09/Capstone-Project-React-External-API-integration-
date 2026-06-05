import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles/index.css'
import './styles/App.css'

// document.getElementById('root'): finds the empty <div id="root"></div> inside your public/index.html file.
// createRoot: initializes React's virtual DOM structure inside that real DOM element.
// .render(): injects your application components directly into that designated space.
createRoot(document.getElementById('root')).render(

  // <React.StrictMode>: development tool that highlights potential problems in your code.
  // It intentionally double-invokes component renders & lifecycles in dev mode to catch side effects.
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
