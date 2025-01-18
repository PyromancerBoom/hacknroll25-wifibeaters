import React, { useState } from "react";
import pdfToText from 'react-pdftotext';
import { useNavigate } from "react-router-dom";
import config from '../../config.json';

const UploadPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
        setError("No file selected.");
        setSelectedFile(null);
        setPdfUrl(null);
        return;
    }

    if (file.size > 10 * 1024 * 1024) {
        setError("File size exceeds the 10MB limit.");
        setSelectedFile(null);
        setPdfUrl(null);
        return;
    }

    if (file.type !== "application/pdf") {
        setError("Only PDF files are allowed.");
        setSelectedFile(null);
        setPdfUrl(null);
        return;
    }

    try {
        setSelectedFile(file);
        setError(null);
        setPdfUrl(URL.createObjectURL(file));
    } catch (error) {
        console.error("Failed to load PDF:", error);
        setError("Failed to load PDF.");
    }
  };

  const handleSubmit = async () => {
    if (selectedFile) {
      try {
        const extractedText = await pdfToText(selectedFile);
        // console.log("FOUND THIS -------- " + extractedText)
        try {
          const response = await fetch(`${config.backendUrl}/classifytext`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: extractedText }),
          });
  
          if (!response.ok) {
            throw new Error('Failed to send text to backend');
          }
  
          // Handle successful response
          const data = await response.json();
          
          // TODO: UPDATE CODE HERE, the new format doens't include "formattedText"
          const formattedText = data.formatted_text;
          console.log(formattedText);
          navigate("/song_page", { state: { formattedText } });
        } catch (error) {
          setError(error.message);
        }
      } catch (error) {
        console.error("Failed to extract text from PDF:", error);
        setError("Failed to extract text from PDF.");
      }
    } else {
      setError("Please upload a PDF file.");
    }
  };

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className="container">
      <h1 className = "white-shadowed-text">Insert Project Name 🎵</h1>
      <h3 className = "white-shadowed-text">Subtitle here very cool very nice</h3>
      <button onClick={() => fileInputRef.current?.click()} className="white-background shadowed-text">
        Select PDF File
      </button>
      <button onClick={handleSubmit} className = "white-background float-right shadowe  d-text">Submit</button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="application/pdf"
        style={{ display: 'none' }}
      />
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {pdfUrl && (
        <div style={{ height: '600px', marginTop: '50px' }}>
          <iframe src={pdfUrl} width="100%" height="100%" />
        </div>
      )}

      
    </div>
  );
};

export default UploadPage;