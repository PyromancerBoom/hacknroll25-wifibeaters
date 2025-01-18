import React, { useState } from "react";

const HighlightWithDraggableMarkers = ({ text, className }: { text: string, className: string  }) => {
  const [highlightStart, setHighlightStart] = useState(0);
  const [highlightEnd, setHighlightEnd] = useState(text.length);
  const [markerPositions, setMarkerPositions] = useState({
    startX: 0,
    endX: 200,
  });

  const handleDrag = (
    e: React.DragEvent<HTMLSpanElement>,
    isStart: boolean
  ) => {
    e.preventDefault();
    const newX = e.clientX;
    setMarkerPositions((prev) => ({
      ...prev,
      [isStart ? "startX" : "endX"]: newX,
    }));

    const index = Math.floor((newX / window.innerWidth) * text.length);
    if (isStart) {
      setHighlightStart(Math.min(index, highlightEnd - 1));
    } else {
      setHighlightEnd(Math.max(index, highlightStart + 1));
    }
  };

  const highlightedText = text.slice(highlightStart, highlightEnd);
  const beforeHighlight = text.slice(0, highlightStart);
  const afterHighlight = text.slice(highlightEnd);

  return (
    <div className="highlight-container">
      <span>{beforeHighlight}</span>
      <span className={className} style={{ position: "relative" }}>
        <span
          className="highlight-start"
          style={{
            position: "absolute",
            left: `${markerPositions.startX}px`,
          }}
          draggable
          onDrag={(e) => handleDrag(e, true)}
        ></span>
        {highlightedText}
        <span
          className="highlight-end"
          style={{
            position: "absolute",
            left: `${markerPositions.endX}px`,
          }}
          draggable
          onDrag={(e) => handleDrag(e, false)}
        ></span>
      </span>
      <span>{afterHighlight}</span>
    </div>
  );
};

export default HighlightWithDraggableMarkers;
