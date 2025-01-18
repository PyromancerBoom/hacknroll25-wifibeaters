import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './global.css'
import SongPage from './pages/song_page.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SongPage />
  </StrictMode>,
)
