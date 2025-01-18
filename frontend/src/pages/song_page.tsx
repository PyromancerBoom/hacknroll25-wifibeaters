import React, { useState } from "react";
import BackToHome from "../components/BackToHome";
import { useNavigate, useLocation } from "react-router-dom";
import AudioGrid from "../components/audio_box"

interface SongPageProps {
  text: string;
}

const SongPage: React.FC<SongPageProps> = ({ text }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const texty = location.state?.text || "No text provided.";

  return (
    <div className="container">
      <h2 className = "shadowed-text">It's time to pick out some audio. 🎧</h2>
      <AudioGrid />
      <div className="white-background">
        <span className="bg-highlight-yellow">{texty}</span> {/* Highlight specific sentence*/}
      </div>
      <BackToHome />
    </div>
  );
};

export default SongPage;