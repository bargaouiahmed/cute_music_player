import { useState } from "react";
import getUrlStatus from "../utility";
import "./stylings.css"
export default function Ytb2MP3(){
    const [url, setUrl] = useState("");
    const [status, setStatus] = useState(null);
    const [isCloning, setIsCloning] = useState(false)

    const handleUrlChange = (e) => {
        setUrl(e.target.value);
    };

    const handleConvert = async () => {
        try {
            const data = await getUrlStatus(url);
            if (!data.link){
                throw new Error("Invalid URL");
            }
            const response =await window.electron.downloadFile(data.link,data.title);
            console.log(response)
            setStatus(data);
        } catch (error) {
            setStatus(null);
        }
        window.location.reload()
    };

    return (
        <div>
            <button className="toggle-button" onClick={()=>{setIsCloning(!isCloning)}}>Toggle cloning</button>
            {isCloning &&
        <div style={
            {
                padding: '20px',
                background: '#2a2a2a',
                borderRadius: '10px',
                color: 'white',
                maxWidth: '400px',
                position: "absolute",
                left:"100px"
        }}
        className="ytb2mp3">

            <h1>YouTube to MP3 Converter</h1>
            <input
                type="text"
                placeholder="Enter YouTube URL"
                value={url}
                onChange={handleUrlChange}
            />
            <button onClick={handleConvert}>Convert</button>
            {status && (
                <div>
                    <h2>Conversion Status</h2>
                    <p>Status: {status.status}</p>
                    <p>Download URL: {status.link}</p>
                    <p>File Name: {status.title}</p>
                </div>
            )}
        </div>}
        </div>
    );
}
