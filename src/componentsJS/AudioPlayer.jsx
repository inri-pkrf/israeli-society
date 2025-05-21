import React, { useRef, useState, useEffect } from 'react';
import '../componentsCSS/AudioPlayer.css';

const AudioPlayer = ({ src, name }) => {
  const audioRef = useRef(null);
  const progressBarRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      const percent = (audio.currentTime / audio.duration) * 100;
      setProgress(percent);
    };

    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  const handleProgressClick = (e) => {
    const progressBar = progressBarRef.current;
    const audio = audioRef.current;
    if (!progressBar || !audio) return;

    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percent = clickX / width;
    audio.currentTime = percent * audio.duration;
  };

  return (
    <div className="voiceeffect-rectangle">
      <span className="voiceeffect-text">{name}</span>
      <button className="audio-button" onClick={togglePlay}>
  {isPlaying ? (
    <img
      src={`${process.env.PUBLIC_URL}/assets/imgs/stop-button.png`}
      alt="עצור"
      className="mic-icon"
    />
  ) : (
    <img
      src={`${process.env.PUBLIC_URL}/assets/imgs/microphone.png`}
      alt="האזן"
      className="mic-icon"
    />
  )}
</button>
      <div
        className="progress-bar"
        ref={progressBarRef}
        onClick={handleProgressClick}
      >
        <div className="progress" style={{ width: `${progress}%` }} />
      </div>
      <audio ref={audioRef} src={src} />
    </div>
  );
};

export default AudioPlayer;
