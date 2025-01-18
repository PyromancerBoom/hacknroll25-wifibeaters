import React, { useState } from "react";
import BackToHome from "../components/BackToHome";
import { useNavigate, useLocation } from "react-router-dom";
import AudioGrid from "../components/audio_box"
import HighlightWithDraggableMarkers from "../components/draggable_marker_text";

interface SongPageProps {
  text: string;
}

const SongPage: React.FC<SongPageProps> = ({ text }) => {
  const navigate = useNavigate();
  const location = useLocation();
  // const texty = location.state?.extractedText || "No text provided.";
  const texty = location.state?.formattedText || "No text provided.";

  const formattedText = texty.replace(/\n/g, "<br />");

  const sentenceRegex = /([^.?!]*[.?!])/g;
  const sentences = texty.match(sentenceRegex) || [];
  
  const firstSentence = sentences[0] || '';
  const remainingSentences = sentences.slice(1).join(' ').trim();

  return (
    <div className="container">
      <h2 className = "shadowed-text">It's time to pick out some audio. 🎧</h2>
      <AudioGrid />
      <div className="white-background">
        <h3 className="font-bold">Extracted Text from PDF</h3>
        {/* <span className="bg-highlight-yellow">{texty}</span> */}
        <div
          className="bg-highlight-yellow"
          dangerouslySetInnerHTML={{ __html: formattedText }}
        />
        <HighlightWithDraggableMarkers text = {firstSentence} className = "bg-highlight-happy"></HighlightWithDraggableMarkers>
        <HighlightWithDraggableMarkers text = {remainingSentences} className = "bg-highlight-sad"></HighlightWithDraggableMarkers>
      </div>

      <BackToHome />
    </div>
  );
};

export default SongPage;