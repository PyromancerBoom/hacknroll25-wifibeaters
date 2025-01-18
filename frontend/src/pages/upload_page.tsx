import React, {useState} from "react";
import pdfToText from 'react-pdftotext'

import { useNavigate } from "react-router-dom";
import HighlightWithDraggableMarkers from "../components/draggable_marker_text";

const UploadPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState<string | null>(null);
  const handleClick = () => {};
  const navigate = useNavigate();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
        setError("No file selected.");
        setSelectedFile(null);
        return;
    }

    if (file.size > 10 * 1024 * 1024) {
        setError("File size exceeds the 10MB limit.");
        setSelectedFile(null);
        return;
    }

    try {
        setSelectedFile(file);
        setError(null);
        const text = await pdfToText(file);
        setExtractedText(text); 
        // const formattedText = text.replace(/\n/g, "<br>").replace(/\s{2,}/g, "\n");
        // setExtractedText(formattedText);
    } catch (error) {
        console.error("Failed to extract text from PDF:", error);
        setError("Failed to extract text from PDF.");
    }
};

  const handleSubmit = async () => {
    console.log("WAGOO");
      if (selectedFile) {
          try {
            console.log("texty");
              const text = await pdfToText(selectedFile);
              setExtractedText(text); 
              navigate("/song_page", { state: { text } });
          } catch (error) {
              console.error("Failed to extract text from PDF:", error);
              setError("Failed to extract text from PDF.");
          }
      } else {
          setError("Please upload a PDF file.");
      }
  };

  return (
      <div>
          <h1>
          Insert Project Name 🎵
          </h1>
          <h2>
          This is a subtitle that will describe the project
          </h2>

          <input type="file" onChange={handleFileChange} accept="application/pdf" />
          {error && <p className="text-red-500 mt-2">{error}</p>} {/* Display error message */}
          <button onClick={handleSubmit}>
              Submit
          </button>

      </div>
  );
};

export default UploadPage;