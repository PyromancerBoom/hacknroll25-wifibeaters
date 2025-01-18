import React, { useState } from "react";
import BackToHome from "../components/BackToHome";
import { useNavigate, useLocation } from "react-router-dom";

interface SongPageProps {
  text: string;
}

const SongPage: React.FC<SongPageProps> = ({ text }) => {
  const navigate = useNavigate();
  const location = useLocation();
  // const texty = location.state?.extractedText || "No text provided.";
  const texty = location.state?.formattedText || "No text provided.";

  const formattedText = texty.replace(/\n/g, "<br />");

  return (
    <div className="container">
      <div className="white-background">
        <h3 className="font-bold">Extracted Text from PDF</h3>
        {/* <span className="bg-highlight-yellow">{texty}</span> */}
        <div
          className="bg-highlight-yellow"
          dangerouslySetInnerHTML={{ __html: formattedText }}
        />
      </div>
      <BackToHome />
    </div>
  );
};

export default SongPage;