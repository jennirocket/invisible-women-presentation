import React from "react";

function PresentationSlide({ chapter, slide, slideIndex, totalSlides }) {
  const highlightText = (text) => {
    if (!text) return text;

    // Pattern to match: numbers (including decimals, ranges), percentages, fractions
    const numberPattern = /(\d+(?:\.\d+)?(?:\s*-\s*\d+)?%?|\d+\/\d+)/g;

    // Split text by numbers and create elements
    const parts = text.split(numberPattern);
    return parts.map((part, index) => {
      if (numberPattern.test(part)) {
        return (
          <span key={index} className="highlight-number">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <div
      className={`slide slide-${slide.type}`}
      style={{
        borderTopColor: chapter.color,
        "--chapter-color": chapter.color,
      }}
    >
      <div className="slide-content">
        <div className="slide-header">
          <span className="chapter-icon">{chapter.icon}</span>
          <h2 className="chapter-title">{chapter.title}</h2>
        </div>

        <div className="slide-body">
          {slide.type === "text" && (
            <div className="text-slide">
              <h3 className="headline">{slide.headline}</h3>
              <p className="content-text">{highlightText(slide.content)}</p>
              {slide.anecdote && (
                <p className="anecdote">💭 {slide.anecdote}</p>
              )}
            </div>
          )}

          {slide.type === "stat" && (
            <div className="stat-slide">
              <h3 className="stat-headline">{slide.headline}</h3>
              <p className="stat-context">{slide.content}</p>
              <div className="stat-display">
                <div className="stat-number">{slide.stat}</div>
                {slide.detail && <p className="stat-detail">{slide.detail}</p>}
                {slide.highlight && (
                  <p className="stat-highlight">"{slide.highlight}"</p>
                )}
              </div>
              {slide.anecdote && (
                <p className="anecdote">💭 {slide.anecdote}</p>
              )}
            </div>
          )}
        </div>

        <div className="slide-footer">
          <span className="slide-counter">
            {slideIndex + 1}/{totalSlides}
          </span>
        </div>
      </div>
    </div>
  );
}

export default PresentationSlide;
