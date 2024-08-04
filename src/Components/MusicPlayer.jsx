import './MusicPlayer.css';
import React, { useRef, useState } from 'react';

export const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [volume, setVolume] = useState(1);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);

    const songs = [
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    ];

    const audioRef = useRef(null);

    const togglePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleTimeUpdate = () => {
        setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
    };

    const handleVolumeChange = (event) => {
        setVolume(event.target.value);
        audioRef.current.volume = volume;
    };

    const handleRewind = () => {
        audioRef.current.currentTime -= 10; // Retrocede 10 segundos
    };

    const handleFastForward = () => {
        audioRef.current.currentTime += 10; // Avanza 10 segundos
    };

    const playPreviousSong = () => {
        setCurrentSongIndex((prevIndex) => (prevIndex === 0 ? songs.length - 1 : prevIndex - 1));
        setIsPlaying(false);
    };

    const playNextSong = () => {
        setCurrentSongIndex((prevIndex) => (prevIndex === songs.length - 1 ? 0 : prevIndex + 1));
        setIsPlaying(false);
    };

    React.useEffect(() => {
        audioRef.current.src = songs[currentSongIndex];
        if (isPlaying) {
            audioRef.current.play();
        }
    }, [currentSongIndex]);

    return (
        <div className="container mt-5">
            <div className="music-player-card card border-primary mb-3" id="color">
                <div className="card-header text-white bg-primary">
                    <h5 className="card-title">Reproductor de Música</h5>
                </div>
                <div className="card-body">
                    <audio
                        ref={audioRef}
                        onTimeUpdate={handleTimeUpdate}
                        preload="metadata"
                    />
                    <div className="d-flex align-items-center justify-content-center" id="contenedor">
                        <button
                            className="btn btn-secondary mx-2"
                            onClick={playPreviousSong}
                        >
                            <i className="bi bi-skip-start"></i> Anterior
                        </button>
                        <button
                            className="btn btn-secondary mx-2"
                            onClick={handleRewind}
                        >
                            <i className="bi bi-arrow-left-circle"></i> Retroceder
                        </button>
                        <button
                            className={`btn ${isPlaying ? 'btn-danger' : 'btn-success'} mx-2`}
                            onClick={togglePlayPause}
                        >
                            {isPlaying ? 'Pausa' : 'Reproducir'}
                        </button>
                        <button
                            className="btn btn-secondary mx-2"
                            onClick={handleFastForward}
                        >
                            Avanzar <i className="bi bi-arrow-right-circle"></i>
                        </button>
                        <button
                            className="btn btn-secondary mx-2"
                            onClick={playNextSong}
                        >
                            Siguiente <i className="bi bi-skip-end"></i>
                        </button>
                    </div>
                    <div className="progress mt-3">
                        <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    <div className="mt-3">
                        <label className="form-label">Volumen:</label>
                        <input
                            type="range"
                            className="form-range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume}
                            onChange={handleVolumeChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
