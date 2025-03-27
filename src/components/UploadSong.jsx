import { useState } from "react";
import "./updateButton.css";

export default function UploadSong() {
    const [songPath, setSongPath] = useState("");
    const [songName, setSongName] = useState("");
    const [toggled, setToggled] = useState(false);

    const handleUpdate = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setSongPath(selectedFile.path);
            setSongName(selectedFile.name);
        }
    };

    const handleUpload = async () => {
        if (!songPath) {
            console.error("No song selected");
            return;
        }
        try {
            const result = await window.electron?.uploadSong(songPath);
            if (result) {
                console.log("Upload successful:", result);
                setSongPath("");
                setSongName("");
                setToggled(false);
            }
        } catch (error) {
            console.error("Upload failed:", error);
        }
        window.location.reload();
    };

    return (
        <div className="upload-container">
            <button
                className="update-button"
                onClick={() => setToggled(!toggled)}
            >
                Add mp3
            </button>

            {toggled && (
                <div className="file-input-wrapper">
                    <label htmlFor="file-upload-button" className="custom-file-label">
                        {songName || "Choose file"}
                    </label>
                    <input
                        id="file-upload-button"
                        type="file"
                        accept="audio/mp3"
                        onChange={handleUpdate}
                        className="hidden-file-input"
                    />
                    <button
                        onClick={handleUpload}
                        disabled={!songPath}
                        className="upload-button"
                    >
                        Upload
                    </button>
                </div>
            )}

            {/* {songName && <div className="selected-file">Selected: {songName}</div>} */}
        </div>
    );
}
