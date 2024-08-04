import './MusicPlayer.css';
import React, { useRef, useState, useEffect } from 'react';

export const MusicPlayer = ({songs,currentSongIndex,setCurrentSongIndex}) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [volume, setVolume] = useState(1);
    


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
        if (audioRef.current && songs[currentSongIndex]) {
            audioRef.current.src = songs[currentSongIndex].song_file;
            audioRef.current.load(); // Carga el nuevo recurso
            if (isPlaying) {
                audioRef.current.play();
            }
        }
    }, [currentSongIndex, isPlaying, songs]);
    
    
    React.useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

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
                        onError={(e) => console.error('Error al cargar el audio:', e)}
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
                          <i className={`bi ${isPlaying ? 'bi-pause-circle-fill' : 'bi-play-circle-fill'}`}></i>

                            {isPlaying ? '' : ''}
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
                    <div className="progress mt-3" >
                        <div
                            className="progress-bar" id="barraprogeso"
                            role="progressbar"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                   
                </div>
            </div>
        </div>
    );
};
