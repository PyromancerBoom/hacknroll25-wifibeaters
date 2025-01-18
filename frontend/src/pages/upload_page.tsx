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

    if (file.size > 5 * 1024 * 1024) {
        setError("File size exceeds the 5MB limit.");
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

          const textArray: string[] = [];
          const emotionArray: string[] = [];
          const musicArray: string[] = [];

          data.classified_chunks.forEach((chunk: { text: string; emotion: string; music: string }) => {
            textArray.push(chunk.text);
            emotionArray.push(chunk.emotion);
            musicArray.push(chunk.music);
          });
          
          const formattedTextArrays = {
            text: textArray,
            emotion: emotionArray,
            music: musicArray
          };

  // Navigate to the highlight page and pass the state
  navigate("/highlight_page", { state: { formattedTextArrays } });
        } catch (error) {
          setError((error as Error).message);
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
      <script src="particles.js"></script>
      <h1 className = "white-shadowed-text"> TunedIN 🎙️</h1>
      <h3 className = "white-shadowed-text">A project generating entertaining and emotionally fitting background music from text-derived sentiments while displaying usually-boring reading material in flashcard-style. It doubles as a tool aiding in content-generation (podcasts, storytime videos) in deciding on music track progression.</h3>
      <button onClick={() => fileInputRef.current?.click()} className="white-background shadowed-text">
        Select PDF File
      </button>
      <button onClick={handleSubmit} className = "float-right white-background shadowe d-text">Submit</button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="application/pdf"
        style={{ display: 'none' }}
      />
      {error && <p className="mt-2 text-red-500">{error}</p>}
      {pdfUrl && (
        <div style={{ height: '600px', marginTop: '50px' }}>
          <iframe src={pdfUrl} width="100%" height="100%" />
        </div>
      )}

      
    </div>
  );
};

export default UploadPage;