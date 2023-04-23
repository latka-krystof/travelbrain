import { Link } from "react-router-dom";
import { useState, useContext } from 'react';
import axios from 'axios';
import Chat from '../components/Chat';
import Map from "../components/Map";

import { AuthContext } from '../context/context';

function Planning() {

    const { isLoggedIn, isSurveyFilledOut } = useContext(AuthContext);

    const [waypoints, setWaypoints] = useState([
        "Rocco's Tavern",
        "Poppy",
        "Muscle Beach"
    ]);

    return (
        <div>
            {!isLoggedIn() ? (
                <h1 className='font-dmsans text-3xl mb-[75vh]'>Please 
                <Link to='/login' className='text-black'> log in </Link> 
                before planning a trip!</h1>
            ) : (
                <div>
                    {!isSurveyFilledOut() ? (
                        <div>
                            <h1 className='font-dmsans text-3xl mb-[75vh]'>Please fill out the survey first</h1>
                        </div>
                    ) : (
                        <div>
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
                    )}
                </div>
            )}
        </div>
    )
}

export default Planning