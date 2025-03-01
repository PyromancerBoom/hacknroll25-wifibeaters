import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface SongPageProps {
  text: string;
}

const SongPage: React.FC<SongPageProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // const texty = location.state?.extractedText || "No text provided.";
  const texty = location.state?.formattedText || "No text provided.";

  const formattedText = texty.replace(/\n/g, "<br />");

  return (
    <div className="container">
      <h2 className = "shadowed-text">It's time to pick out some audio. 🔊</h2>

      {/* TODO: ADD BACK WHEN NEED PEOPLE TO ADD THEIR OWN SONGS
      <AudioGrid />  */}

      <div className="white-background">
        <h3 className="font-bold">Extracted Text from PDF</h3>
        {/* <span className="bg-highlight-yellow">{texty}</span> */}
        <div
          className="bg-highlight-yellow"
          dangerouslySetInnerHTML={{ __html: formattedText }}
        />
      </div>

      <button onClick={() => {navigate("/upload_page")}} className = "float-right white-background shadowe d-text">Return to File Selection</button>
      <button onClick={() => {navigate("/highlight_page")}} className = "float-right white-background shadowe d-text">Continue</button>
    </div>
  );
};

export default SongPage;