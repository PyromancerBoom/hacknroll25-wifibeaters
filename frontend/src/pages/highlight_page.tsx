import React, { useState, useRef, useEffect } from "react";
import { useLocation } from 'react-router-dom';

const HighlightPage: React.FC = () => {
  const { state } = useLocation();
  const { formattedTextArrays } = state || {};
  const [currentSlide, setCurrentSlide] = useState(0);

  const texts = formattedTextArrays.text;
  const backgrounds = (formattedTextArrays.emotion as string[]).map((background: string) => `${background}-background`);
  const audioFiles = formattedTextArrays.music;

  const audioRefs = useRef<HTMLAudioElement[]>(
    audioFiles.map(() => new Audio())
  );

  const crossfadeToSlide = (nextSlide: number) => {
    const currentAudio = audioRefs.current[currentSlide];
    const nextAudio = audioRefs.current[nextSlide];

    if (currentAudio && nextAudio) {
      nextAudio.volume = 0;
      nextAudio.play();

      const fadeDuration = 3000;
      const intervalTime = 50;
      const steps = fadeDuration / intervalTime;
      const volumeStep = 1 / steps;

      let volume = 1;

      const fadeInterval = setInterval(() => {
        volume -= volumeStep;

        if (volume <= 0) {
          clearInterval(fadeInterval);
          currentAudio.pause();
          currentAudio.currentTime = 0;
        }

        currentAudio.volume = Math.max(volume, 0);
        nextAudio.volume = Math.min(1 - volume, 1);
      }, intervalTime);
    }

    setCurrentSlide(nextSlide);
  };

  const handleArrowClick = (direction: "left" | "right") => {
    const nextSlide =
      direction === "left"
        ? (currentSlide - 1 + backgrounds.length) % backgrounds.length
        : (currentSlide + 1) % backgrounds.length;
    crossfadeToSlide(nextSlide);
  };

  useEffect(() => {
    audioRefs.current.forEach((audio, index) => {
      audio.src = audioFiles[index] || '';
    });

    const firstAudio = audioRefs.current[0];
    if (firstAudio) {
      firstAudio.volume = 1;
      firstAudio.play().catch((err) => console.error("Audio playback error:", err));
    }

    return () => {
      audioRefs.current.forEach((audio) => {
        audio.pause();
        audio.currentTime = 0;
      });
    };
  }, []);

  return (
    <div>
      <style>
        {`
          :root {
            --spacing-unit: 1rem;
          }

          .container {
            width: 90%;
            max-width: 60rem;
            margin: 0 auto;
            padding: var(--spacing-unit);
          }

          .shadowed-text {
            text-align: center;
            font-size: 1.5rem;
            margin-bottom: 1.5rem;
          }

          .carousel {
            position: relative;
            min-height: 70vh;
            overflow: hidden;
            border-radius: 0.5rem;
            margin: 0 auto;
            width: 100%;
          }

          .slide {
            position: absolute;
            top: 0;
            left: 0;
            width: 90%;
            min-height: 100%;
            padding: calc(var(--spacing-unit) * 2);
            transition: all 0.3s ease;
            opacity: 0;
            transform: translateX(100%);
            font-size: 1.16rem;
            line-height: 1.6;
            text-align: left;
            overflow-y: auto;
            border-radius: 0.5rem;
          }

          .slide.active {
            opacity: 1;
            transform: translateX(0);
          }

          .slide.previous {
            transform: translateX(-100%);
          }

          .arrows {
            display: flex;
            justify-content: center;
            gap: calc(var(--spacing-unit) * 1.25);
            margin-top: calc(var(--spacing-unit) * 1.25);
          }

          .arrows button {
            padding: calc(var(--spacing-unit) * 0.75) calc(var(--spacing-unit) * 1.25);
            font-size: 1.25rem;
            cursor: pointer;
            border: none;
            border-radius: 0.25rem;
            background: var(--background-color, #eee);
            transition: all 0.3s ease;
          }

          .arrows button:hover {
            background: var(--hover-background, #ddd);
          }

          /* Emotion backgrounds with CSS variables */
          .happy-background {
            --background-color: hsl(51, 100%, 50%);
          }
          .sad-background {
            --background-color: hsl(207, 44%, 49%);
          }
          .angry-background {
            --background-color: hsl(348, 83%, 47%);
          }
          .calm-background {
            --background-color: hsl(120, 93%, 79%);
          }
        `}
      </style>

      <div className="container">
        <h2 className="shadowed-text">Let's get listening. 🎧</h2>
        <button 
          style={{
            border: '1px solid white'
          }}
          onClick={() => location.href = audioFiles[currentSlide]}
        >
          Download
        </button>
        <div className="carousel">
          {backgrounds.map((bgClass, index) => (
            <div>
              <div
                key={index}
                className={`slide ${bgClass} ${
                  index === currentSlide 
                    ? 'active'
                    : index === (currentSlide - 1 + backgrounds.length) % backgrounds.length
                    ? 'previous'
                    : ''
                }`}
              >
                {texts[index]}
              </div>
            </div>
          ))}
        </div>

        <div className="arrows">
          <button onClick={() => handleArrowClick("left")}>←</button>
          <button onClick={() => handleArrowClick("right")}>→</button>
        </div>
      </div>
    </div>
  );
};

export default HighlightPage;