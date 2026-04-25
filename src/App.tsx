import { useState, useRef, useEffect, ChangeEvent } from 'react';

export default function App() {
  const [video1, setVideo1] = useState<string | null>(null);
  const [video2, setVideo2] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [duration, setDuration] = useState(0);
  const [volume1, setVolume1] = useState(1);
  const [volume2, setVolume2] = useState(1);
  
  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, setVideo: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideo(URL.createObjectURL(file));
    }
  };

  const syncPlay = () => {
    videoRef1.current?.play();
    videoRef2.current?.play();
    setIsPlaying(true);
  };

  const syncPause = () => {
    videoRef1.current?.pause();
    videoRef2.current?.pause();
    setIsPlaying(false);
  };

  const syncSeek = (e: ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef1.current) videoRef1.current.currentTime = time;
    if (videoRef2.current) videoRef2.current.currentTime = time;
  };

  const handlePlaybackRateChange = (rate: number) => {
    setPlaybackRate(rate);
    if (videoRef1.current) videoRef1.current.playbackRate = rate;
    if (videoRef2.current) videoRef2.current.playbackRate = rate;
  };

  const handleVolumeChange = (e: ChangeEvent<HTMLInputElement>, videoNum: 1 | 2) => {
    const val = parseFloat(e.target.value);
    if (videoNum === 1) {
      setVolume1(val);
      if (videoRef1.current) videoRef1.current.volume = val;
    } else {
      setVolume2(val);
      if (videoRef2.current) videoRef2.current.volume = val;
    }
  };

  useEffect(() => {
    const v1 = videoRef1.current;
    if (!v1) return;

    const updateDuration = () => setDuration(v1.duration);
    v1.addEventListener('loadedmetadata', updateDuration);
    return () => v1.removeEventListener('loadedmetadata', updateDuration);
  }, [video1]);

  useEffect(() => {
    const v1 = videoRef1.current;
    const v2 = videoRef2.current;
    
    if (v1 && v2) {
      const onPlay = () => { v2.play(); setIsPlaying(true); };
      const onPause = () => { v2.pause(); setIsPlaying(false); };
      const onSeek = () => { v2.currentTime = v1.currentTime; };

      v1.addEventListener('play', onPlay);
      v1.addEventListener('pause', onPause);
      v1.addEventListener('seeking', onSeek);

      return () => {
        v1.removeEventListener('play', onPlay);
        v1.removeEventListener('pause', onPause);
        v1.removeEventListener('seeking', onSeek);
      };
    }
  }, [video1, video2]);

  return (
    <div className="container">
      <h1>Video Comparator</h1>
      
      <div className="upload-section">
        <div className="upload-box">
          <label>Video 1 (Master): </label>
          <input type="file" accept="video/*" onChange={(e) => handleFileChange(e, setVideo1)} />
        </div>
        <div className="upload-box">
          <label>Video 2 (Slave): </label>
          <input type="file" accept="video/*" onChange={(e) => handleFileChange(e, setVideo2)} />
        </div>
      </div>

      <div className="player-grid">
        <div className="video-wrapper">
          <h3>Video 1</h3>
          {video1 ? (
            <video ref={videoRef1} src={video1} style={{width: '100%'}} />
          ) : (
            <div className="placeholder">Bitte Video 1 wählen</div>
          )}
          <div className="volume-control">
            <label>🔈 </label>
            <input 
              type="range" min="0" max="1" step="0.01" 
              value={volume1} 
              onChange={(e) => handleVolumeChange(e, 1)} 
            />
            <span>{Math.round(volume1 * 100)}%</span>
          </div>
        </div>
        <div className="video-wrapper">
          <h3>Video 2</h3>
          {video2 ? (
            <video ref={videoRef2} src={video2} style={{width: '100%'}} />
          ) : (
            <div className="placeholder">Bitte Video 2 wählen</div>
          )}
          <div className="volume-control">
            <label>🔈 </label>
            <input 
              type="range" min="0" max="1" step="0.01" 
              value={volume2} 
              onChange={(e) => handleVolumeChange(e, 2)} 
            />
            <span>{Math.round(volume2 * 100)}%</span>
          </div>
        </div>
      </div>

      <div className="controls">
        <button className="play-btn" onClick={isPlaying ? syncPause : syncPlay}>
          {isPlaying ? 'PAUSE' : 'PLAY'}
        </button>
        
        <div className="control-group">
          <label>Speed: </label>
          <select value={playbackRate} onChange={(e) => handlePlaybackRateChange(parseFloat(e.target.value))}>
            <option value="0.25">0.25x</option>
            <option value="0.5">0.5x</option>
            <option value="1">1x</option>
            <option value="1.5">1.5x</option>
            <option value="2">2x</option>
          </select>
        </div>

        <div className="control-group slider-group">
          <label>Timeline: </label>
          <input 
            type="range" 
            min="0" 
            max={duration || 100} 
            step="0.01"
            onChange={syncSeek} 
          />
        </div>
      </div>

      <div className="hints">
        <p>Hinweis: Video 1 steuert die Wiedergabe für beide Fenster.</p>
      </div>
    </div>
  );
}
