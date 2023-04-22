import { Link } from "react-router-dom";
import { useState } from 'react';
import Chat from '../components/Chat';
import Map from "../components/Map";

function LandingPage() {

    const [waypoints, setWaypoints] = useState([
        "Rocco's Tavern",
        "Poppy",
        "Muscle Beach"
    ]);

    return (
        <div>
            <h1>TravelBrain.</h1>
            <h2>Your lastminute travel companion.</h2>
            <Link to='/register'>Register here!</Link>
            <Chat/>
            <Map
                origin="UCLA, CA"
                destination="Santa Monica, CA"
                waypoints={waypoints}
            />
            <ul>
                {waypoints.map((waypoint, index) => (
                    <li key={index}>{index + 1}. {waypoint}</li>
                ))}
            </ul>
        </div>
    )
}

export default LandingPage