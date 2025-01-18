import React, { useState } from "react";
import pdfToText from 'react-pdftotext';
import { useNavigate } from "react-router-dom";

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
            const text = await pdfToText(selectedFile);
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
    <div className="container">
      <h1>Insert Project Name 🎵</h1>
      <input type="file" onChange={handleFileChange} accept="application/pdf" />
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {pdfUrl && (
        <div style={{ height: '600px', marginTop: '50px' }}>
          <iframe src={pdfUrl} width="100%" height="100%" />
        </div>
      )}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default UploadPage;