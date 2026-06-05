import React from 'react'

// functional component -> display loading state
export default function LoadingSpinner() {
  return (
    // 'role="status"': informs screen readers content is updating
    // 'aria-live="polite": ensures screen reader waits until user idle before announcing loading status
    <div className="loading" role="status" aria-live="polite">
      <div className="spinner" />
      <span>Loading...</span>
    </div>
  )
}
