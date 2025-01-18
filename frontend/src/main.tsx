import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './global.css'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UploadPage from './pages/upload_page.tsx'
import SongPage from './pages/song_page.tsx'
import HighlightPage from './pages/highlight_page.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<UploadPage />} />
        <Route path="/upload_page" element={<UploadPage />} />
        <Route path="/song_page" element={<SongPage />} />
        <Route path="/highlight_page" element={<HighlightPage />} />
      </Routes>
    </Router>
  </StrictMode>,
)
