    import { useState } from "react";
    export default function ManualPlay({ songs, audio, getSafeUrl, paused }) {
        const [isSelecting, setIsSelecting] = useState(false);

        const handleSelect = (song) => {
            audio.current.src = getSafeUrl(song.url);
            if(!paused){
                audio.current.play()
            }
            setIsSelecting(false);

        }

        return (
            <div style={{
                ...(isSelecting ? {
                    padding: '20px',
                    background: '#2a2a2a',
                    borderRadius: '10px',
                    color: 'white',
                    maxWidth: '400px',
                    margin: '0 auto',
                    position: 'absolute'
                } : {})
            }
            }>

                <button
                    onClick={() => setIsSelecting(!isSelecting)}
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
                    onMouseOver={(e) => e.target.style.background = '#555'}
                    onMouseOut={(e) => e.target.style.background = '#444'}
                >
                    {isSelecting ? "Close Selection" : "Select a Song"}
                </button>

                {isSelecting && (
                    <ul style={{
                        listStyle: 'none',
                        padding: 0,
                        maxHeight: '300px',
                        overflowY: 'auto'
                    }}>
                        {songs.map((song, index) => (
                            <li key={index} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '10px',
                                margin: '8px 0',
                                background: '#333',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                transition: 'all 0.3s'
                            }}
                                onClick={() => handleSelect(song)}
                                onMouseOver={(e) => e.target.style.background = '#3a3a3a'}
                                onMouseOut={(e) => e.target.style.background = '#333'}
                            >
                                <span style={{
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    maxWidth: '100%'
                                }}>{song.name}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        );
    }
