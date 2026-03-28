import React from "react";

function NavigationControls({ onNext, onPrev, canNext, canPrev }) {
  return (
    <div className="navigation-controls">
      <button
        className="nav-button prev-button"
        onClick={onPrev}
        disabled={!canPrev}
        aria-label="Previous slide"
      >
        <span className="arrow">←</span>
        <span className="button-text">Previous</span>
      </button>

      <div className="keyboard-hint">Use ← → arrows or click buttons</div>

      <button
        className="nav-button next-button"
        onClick={onNext}
        disabled={!canNext}
        aria-label="Next slide"
      >
        <span className="button-text">Next</span>
        <span className="arrow">→</span>
      </button>
    </div>
  );
}

export default NavigationControls;
