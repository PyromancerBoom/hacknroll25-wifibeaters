import React, { useState } from "react";
import BackToHome from "../components/BackToHome";
import { useNavigate, useLocation } from "react-router-dom";

interface SongPageProps {
  text: string;
}

const SongPage: React.FC<SongPageProps> = ({ text }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const texty = location.state?.extractedText || "No text provided.";

  return (
    <div className="container">
      <div className="white-background">
        <h3 className="font-bold">Extracted Text from PDF</h3>
        <span className="bg-highlight-yellow">{texty}</span> {/* Highlight specific sentence*/}

      </div>
      <BackToHome />
    </div>
  );
};

export default SongPage;