
import "./pausebtn.css"
export default function PauseButton({onClick, paused}){

    return(
        <button onClick={onClick} className={`button ${!paused? "paused":""}`}>

        </button>
    )


}
