import React, {useState} from "react";
import DefaultButton from "../components/default_button";
import { useNavigate, useLocation } from "react-router-dom";

interface SongPageProps {
  text: string;
}

const SongPage: React.FC<SongPageProps> = ( { text }) => {
  const handleClick = () => {};
  const navigate = useNavigate();

  const location = useLocation();
  const texty = location.state?.text || "No text provided.";

  return (
    <div className="container">
    <div className="white-background">
        <h3 className="font-bold">Extracted Text from PDF</h3>
        <span className="bg-highlight-yellow">{texty}</span> {/* Highlight specific sentence*/}

        <span className="bg-highlight-happy">
          <span className="highlight-start"></span>
            This is the highlighted text. It starts with an image at the beginning and ends with an image at the end.
          <span className="highlight-end"></span>
        </span>

        <span className="bg-highlight-sad">
          <span className="highlight-start"></span>
          Another piece of cool text. It starts with an image at the beginning and ends with an image at the end.
          <span className="highlight-end"></span>
        </span>


        {/* <DefaultButton text = "Return" onClick={() => navigate("/upload_page")}/> */}
    </div>
    </div>
);
};

export default SongPage;









