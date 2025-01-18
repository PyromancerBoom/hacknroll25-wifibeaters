import React, { useState, useRef, useEffect } from "react";

const HighlightPage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const backgrounds = [
    "happy-background",
    "sad-background",
    "angry-background",
    "relaxed-background",
  ];
  const audioFiles = [
    "/audio/rock.00000.wav", // Replace with your correct public path
    "/audio/pop.00000.wav",
    "/audio/hiphop.00000.wav",
    "/audio/country.00000.wav",
  ];

  const audioRefs = useRef<HTMLAudioElement[]>(
    audioFiles.map(() => new Audio())
  );

  const crossfadeToSlide = (nextSlide: number) => {
    const currentAudio = audioRefs.current[currentSlide];
    const nextAudio = audioRefs.current[nextSlide];

    if (currentAudio && nextAudio) {
      nextAudio.volume = 0; // Start next audio at 0 volume
      nextAudio.play(); // Play the next audio track

      const fadeDuration = 3000; // Crossfade duration in milliseconds
      const intervalTime = 50; // Time between volume adjustments
      const steps = fadeDuration / intervalTime;
      const volumeStep = 1 / steps;

      let volume = 1; // Start volume for the current audio

      const fadeInterval = setInterval(() => {
        volume -= volumeStep;

        if (volume <= 0) {
          clearInterval(fadeInterval); // Stop fading
          currentAudio.pause(); // Stop the current audio
          currentAudio.currentTime = 0; // Reset time for replay
        }

        // Apply fading volumes
        currentAudio.volume = Math.max(volume, 0);
        nextAudio.volume = Math.min(1 - volume, 1); // Inverse fade
      }, intervalTime);
    }

    setCurrentSlide(nextSlide); // Move to the next slide
  };

  const handleArrowClick = (direction: "left" | "right") => {
    const nextSlide =
      direction === "left"
        ? (currentSlide - 1 + backgrounds.length) % backgrounds.length
        : (currentSlide + 1) % backgrounds.length;
    crossfadeToSlide(nextSlide);
  };

  useEffect(() => {
    // Initialize audio sources
    audioRefs.current.forEach((audio, index) => {
      audio.src = audioFiles[index];
    });

    // Play the first audio immediately on mount
    const firstAudio = audioRefs.current[0];
    if (firstAudio) {
      firstAudio.volume = 1;
      firstAudio.play().catch((err) => console.error("Audio playback error:", err));
    }

    return () => {
      // Stop all audio when leaving the page
      audioRefs.current.forEach((audio) => {
        audio.pause();
        audio.currentTime = 0;
      });
    };
  }, []);

  return (
    <div className="container">
      <h2 className="shadowed-text">Let's get listening. 🎧</h2>

      <div
        className="carousel"
        style={{
          display: "flex",
          overflow: "hidden",
          width: "100%",
        }}
      >
        <div
          className="slides"
          style={{
            display: "flex",
            transform: `translateX(-${currentSlide * 100}%)`,
            transition: "transform 0.5s ease-in-out",
          }}
        >
          {backgrounds.map((bgClass, index) => (
            <div
              key={index}
              className={bgClass}
              style={{
                minWidth: "100%",
                height: "100vh", // Adjust height as needed
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "24px",
                color: "white",
              }}
            >
              {`Background for ${bgClass.split("-")[0]} text`}
            </div>
          ))}
        </div>
      </div>

      {/* Arrows for navigation */}
      <div className="arrows">
        <button
          onClick={() => handleArrowClick("left")}
          style={{
            position: "absolute",
            top: "50%",
            left: "1rem",
            transform: "translateY(-50%)",
            background: "rgba(255, 255, 255, 0.2)",
            border: "2px solid gray",
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          &#8592;
        </button>
        <button
          onClick={() => handleArrowClick("right")}
          style={{
            position: "absolute",
            top: "50%",
            right: "1rem",
            transform: "translateY(-50%)",
            background: "rgba(255, 255, 255, 0.2)",
            border: "2px solid gray",
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          &#8594;
        </button>
      </div>

      <div className="prompt" style={{ textAlign: "center", marginTop: "1rem" }}>
        <p>Press the <strong>Left</strong> or <strong>Right</strong> arrows or <strong>Space</strong> key to navigate!</p>
      </div>
    </div>
  );
};

export default HighlightPage;
