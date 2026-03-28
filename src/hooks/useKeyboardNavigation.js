import React, { useEffect } from "react";

function useKeyboardNavigation(onNext, onPrev, canNext, canPrev) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight" && canNext) {
        onNext();
      } else if (event.key === "ArrowLeft" && canPrev) {
        onPrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onNext, onPrev, canNext, canPrev]);
}

export default useKeyboardNavigation;
