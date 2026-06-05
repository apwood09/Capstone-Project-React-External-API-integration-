import React from 'react'

// accepts 'children' as prop: reps any content -> text OR elements
export default function ErrorMessage({ children }) {
  return (
    // 'role="alert"': attribute -> accessibility feature
    // immediately notifies screen readers error message appeared
    <div className="error" role="alert">
      {children}
    </div>
  )
}
