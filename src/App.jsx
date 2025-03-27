import { useRef, useState, useEffect } from "react";
import frontImage from "./assets/front.png";
import PauseButton from "./components/PauseButton";
import CloseButton from "./components/CloseButton";
import UploadSong from "./components/UploadSong";
import SongSelection from "./components/SongSelection";
import "./App.css";

function App() {
  const [paused, setPaused] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audio = useRef(new Audio());
  const [songs, setSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isSequentialPlaying, setIsSequentialPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting]=useState(false)

  // Helper function to handle file URLs safely
  const getSafeUrl = (url) => {
    if (!url) return '';
    return url.startsWith('file://') ? url : `file://${url}`;
  };

  // Load all songs on mount
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        setIsLoading(true);
        const songs = await window.electron?.fetchAllSongs();
        if (songs && songs.length > 0) {
          setSongs(songs);
          audio.current.src = getSafeUrl(songs[0].url);
        }
      } catch (err) {
        console.error("Failed to load songs:", err);
        setError("Failed to load songs. Please restart the app.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSongs();
  }, []);

  // Setup audio event listeners
  useEffect(() => {
    const audioElement = audio.current;

    const updateProgress = () => {
      setProgress((audioElement.currentTime / audioElement.duration) * 100 || 0);
    };

    const setAudioDuration = () => {
      setDuration(audioElement.duration);
    };

    const handleSongEnd = () => {
      if (isSequentialPlaying && songs.length > 0) {
        playNextSong();
      } else {
        setPaused(true);
      }
    };

    const handleError = () => {
      console.error("Audio playback error");
      setError("Error playing audio file");
      setPaused(true);
    };

    audioElement.addEventListener("timeupdate", updateProgress);
    audioElement.addEventListener("loadedmetadata", setAudioDuration);
    audioElement.addEventListener("ended", handleSongEnd);
    audioElement.addEventListener("error", handleError);

    return () => {
      audioElement.removeEventListener("timeupdate", updateProgress);
      audioElement.removeEventListener("loadedmetadata", setAudioDuration);
      audioElement.removeEventListener("ended", handleSongEnd);
      audioElement.removeEventListener("error", handleError);
    };
  }, [songs, isSequentialPlaying, currentSongIndex]);
const onclose=()=>{
  setIsDeleting(false)
  window.location.reload()
}
  const playNextSong = () => {
    if (songs.length === 0) return;

    const nextIndex = (currentSongIndex + 1) % songs.length;
    setCurrentSongIndex(nextIndex);
    audio.current.src = getSafeUrl(songs[nextIndex].url);
    audio.current.play()
      .then(() => {
        setPaused(false);
        setError(null);
      })
      .catch(err => {
        console.error("Playback failed:", err);
        setError("Failed to play song");
        setPaused(true);
      });
  };

  const togglePlayPause = () => {
    if (!audio.current.src) {
      if (songs.length > 0) {
        audio.current.src = getSafeUrl(songs[0].url);
      } else {
        setError("No songs available");
        return;
      }
    }

    if (paused) {
      audio.current.play()
        .then(() => {
          setPaused(false);
          setError(null);
        })
        .catch(err => {
          console.error("Playback failed:", err);
          setError("Failed to play song");
          setPaused(true);
        });
    } else {
      audio.current.pause();
      setPaused(true);
    }
  };


  const toggleSequentialPlay = () => {
    setIsSequentialPlaying(!isSequentialPlaying);
  };

  const onSeek = (event) => {
    const newTime = (event.target.value / 100) * duration;
    audio.current.currentTime = newTime;
    setProgress(event.target.value);
  };

  const handleNewSongUploaded = () => {
    // Refresh the song list
    window.electron?.fetchAllSongs()
      .then(newSongs => {
        setSongs(newSongs);
        setError(null);
      })
      .catch(err => {
        console.error("Failed to refresh songs:", err);
        setError("Failed to update song list");
      });
  };

  if (isLoading) {
    return (
      <div className="text-center p-4">
        <div className="text-white">Loading songs...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-4">
        <div className="text-red-500">{error}</div>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-pink-500 text-white rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (<>
    <CloseButton />

    <div className="text-center p-4">
      <div style={{
        margin:"0px 5% auto",
        display: "flex",
        flexDirection: "row",
        justifyContent:"space-around"
      }}>
      <button
      style={{
        background: '#444',
        color: 'white',
        border: 'none',
        padding: '6px 10px',
        borderRadius: '20px',
        cursor: 'pointer',
        display: 'block',
        height:"35px",


        transition: 'all 0.3s'
    }}
      onClick={()=>setIsDeleting(true)}>delete songs</button>
      {isDeleting &&

      <SongSelection songs={songs} setSongs={setSongs} onclose={onclose} />}
      <UploadSong onUploadComplete={handleNewSongUploaded} /></div>
      <img src={frontImage} style={{ zIndex: "1",
        position:"static"
       }} alt="" />
      <div className="music-control" style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        marginTop: "10px"
      }}>
        <PauseButton onClick={togglePlayPause} paused={paused} />

        {/* Progress Bar */}
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={onSeek}
          className="progress-bar"
          style={{
            height: "10px",
            accentColor: "pink",
            width: "350px",
            background: `linear-gradient(to right, #FF69B4 0%, #FF69B4 ${progress}%, #444 ${progress}%, #444 100%)`,
            border: "4px solid #fff",
            borderRadius: "2px",
            boxShadow: "0 0 8px #ff69b4",
            opacity: paused ? 0.7 : 1,
            transition: "opacity 0.3s ease-out"
          }}
        />

        {/* Time Display */}
        <div className="text-white" style={{ minWidth: "80px" }}>
          {formatTime(audio.current?.currentTime || 0)} / {formatTime(duration)}
        </div>

        {/* Sequential Play Toggle */}
        <button
          onClick={toggleSequentialPlay}
          style={{
            padding: "5px 10px",
            background: isSequentialPlaying ? "#FF69B4" : "#444",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          {isSequentialPlaying ? "🔁 On" : "🔁 Off"}
        </button>
      </div>
    </div>
    </>
  );
}

const formatTime = (time) => {
  if (!time || isNaN(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export default App;
