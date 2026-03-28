import React from "react";

function ChapterNavigation({ chapters, currentChapterIndex, onSelectChapter }) {
  return (
    <nav className="chapter-navigation">
      <span className="vertical-label">Navigation</span>
      <h3 className="nav-title">Chapters</h3>
      <div className="chapter-list">
        {chapters.map((chapter, index) => (
          <button
            key={index}
            className={`chapter-button ${index === currentChapterIndex ? "active" : ""}`}
            onClick={() => onSelectChapter(index)}
            aria-current={index === currentChapterIndex ? "page" : undefined}
          >
            <span className="chapter-number">{index + 1}</span>
            <span className="chapter-name">{chapter.title}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}

export default ChapterNavigation;
