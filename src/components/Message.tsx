import { useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";

export function Message(){

    let navigate = useNavigate();

    return <>
    <Navbar></Navbar>
    <div className="message">
   <h1>You need permission to view this content !!! </h1>
   <div className="back-btn" onClick={() => {
        navigate('/groups');
    }}>Back</div>
    </div>
    </>
}