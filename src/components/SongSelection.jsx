import { useState } from "react";
export default function SongSelection({ songs, setSongs, onclose }) {
    const [deletingId, setDeletingId] = useState(null);

    const deleteSong = async (songUrl) => {
        setDeletingId(songUrl);
        try {
            const success = await window.electron.deleteSong(songUrl.replace("file://", ""));
            if (success) {
                setSongs(songs.filter(song => song.url !== songUrl));
            }
        } catch (e) {
            console.error("Delete failed", e);
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div style={{
            padding: '20px',
            background: '#2a2a2a',
            borderRadius: '10px',
            color: 'white',
            maxWidth: '400px',
            margin: '0 auto',
            position:"absolute"
        }}>
            <h1 style={{
                textAlign: 'center',
                color: '#FF69B4',
                marginBottom: '20px'
            }}>Song Selection</h1>

            <button
                onClick={onclose}
                style={{
                    background: '#444',
                    color: 'white',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    marginBottom: '20px',
                    display: 'block',
                    width: '100%',
                    transition: 'all 0.3s'
                }}
                onMouseOver={(e) => e.target.style.background = '#555'}
                onMouseOut={(e) => e.target.style.background = '#444'}
            >
                Stop Deleting
            </button>

            <ul style={{
                listStyle: 'none',
                padding: 0,
                maxHeight: '300px',
                overflowY: 'auto'
            }}>
                {songs.map(song => (
                    <li key={song.url} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '10px',
                        margin: '8px 0',
                        background: '#333',
                        borderRadius: '8px'
                    }}>
                        <span style={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            maxWidth: '70%'
                        }}>{song.name}</span>

                        <button
                            onClick={() => deleteSong(song.url)}
                            disabled={deletingId === song.url}
                            style={{
                                background: deletingId === song.url ? '#777' : '#FF69B4',
                                color: 'white',
                                border: 'none',
                                padding: '6px 12px',
                                borderRadius: '20px',
                                cursor: 'pointer',
                                transition: 'all 0.3s',
                                minWidth: '80px'
                            }}
                            onMouseOver={(e) => {
                                if (deletingId !== song.url) {
                                    e.target.style.background = '#e0559f';
                                }
                            }}
                            onMouseOut={(e) => {
                                if (deletingId !== song.url) {
                                    e.target.style.background = '#FF69B4';
                                }
                            }}
                        >
                            {deletingId === song.url ? 'Deleting...' : 'Delete'}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
