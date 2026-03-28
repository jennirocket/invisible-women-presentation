import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import PresentationSlide from "./components/PresentationSlide";
import NavigationControls from "./components/NavigationControls";
import ChapterNavigation from "./components/ChapterNavigation";
import { chapters } from "./data/chapters";

function App() {
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const currentChapter = chapters[currentChapterIndex];
  const currentSlide = currentChapter.slides[currentSlideIndex];

  const handleNextSlide = useCallback(() => {
    setCurrentSlideIndex((prevSlideIndex) => {
      if (prevSlideIndex < chapters[currentChapterIndex].slides.length - 1) {
        return prevSlideIndex + 1;
      } else if (currentChapterIndex < chapters.length - 1) {
        setCurrentChapterIndex((prevChapterIndex) => prevChapterIndex + 1);
        return 0;
      }
      return prevSlideIndex;
    });
  }, [currentChapterIndex]);

  const handlePrevSlide = useCallback(() => {
    setCurrentSlideIndex((prevSlideIndex) => {
      if (prevSlideIndex > 0) {
        return prevSlideIndex - 1;
      } else if (currentChapterIndex > 0) {
        setCurrentChapterIndex((prevChapterIndex) => prevChapterIndex - 1);
        return chapters[currentChapterIndex - 1].slides.length - 1;
      }
      return prevSlideIndex;
    });
  }, [currentChapterIndex]);

  const handleChapterSelect = useCallback((index) => {
    setCurrentChapterIndex(index);
    setCurrentSlideIndex(0);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") {
        if (
          currentChapterIndex < chapters.length - 1 ||
          currentSlideIndex < currentChapter.slides.length - 1
        ) {
          handleNextSlide();
        }
      } else if (event.key === "ArrowLeft") {
        if (currentChapterIndex > 0 || currentSlideIndex > 0) {
          handlePrevSlide();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    currentChapterIndex,
    currentSlideIndex,
    handleNextSlide,
    handlePrevSlide,
    currentChapter,
  ]);

  const totalSlides = chapters.reduce((sum, ch) => sum + ch.slides.length, 0);
  const currentSlideNumber =
    chapters
      .slice(0, currentChapterIndex)
      .reduce((sum, ch) => sum + ch.slides.length, 0) +
    currentSlideIndex +
    1;

  const progressPercentage = ((currentSlideNumber / totalSlides) * 100).toFixed(
    1,
  );

  return (
    <div className="App">
      <header className="header">
        <h1>Invisible Women</h1>
        <p className="subtitle">Data Bias in a World Designed for Men</p>
      </header>

      <main className="main-container">
        <PresentationSlide
          chapter={currentChapter}
          slide={currentSlide}
          slideIndex={currentSlideIndex}
          totalSlides={currentChapter.slides.length}
        />

        <NavigationControls
          onNext={handleNextSlide}
          onPrev={handlePrevSlide}
          canNext={
            currentChapterIndex < chapters.length - 1 ||
            currentSlideIndex < currentChapter.slides.length - 1
          }
          canPrev={currentChapterIndex > 0 || currentSlideIndex > 0}
        />
      </main>

      <ChapterNavigation
        chapters={chapters}
        currentChapterIndex={currentChapterIndex}
        onSelectChapter={handleChapterSelect}
      />

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            width: `${progressPercentage}%`,
            background: currentChapter.color || "#fbbf24",
            boxShadow: `0 0 20px ${currentChapter.color || "#fbbf24"}80`,
          }}
        ></div>
      </div>

      <footer className="footer">
        <p>
          Slide {currentSlideNumber} of {totalSlides}
        </p>
      </footer>

      <section className="book-recommendation">
        <div className="book-recommendation-content">
          <img
            src={require("./assets/cover.jpeg")}
            alt="Invisible Women book cover"
            className="book-cover"
          />
          <div className="book-info">
            <h2>Want to learn more?</h2>
            <p>
              This presentation is just a glimpse. For the full story, I highly
              recommend reading{" "}
              <strong>
                Invisible Women: Data Bias in a World Designed for Men
              </strong>{" "}
              by Caroline Criado Perez.
            </p>
            <a
              href="https://www.amazon.com/Invisible-Women-Data-World-Designed/dp/1419729071"
              target="_blank"
              rel="noopener noreferrer"
              className="amazon-link"
            >
              Buy on Amazon
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
