import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import Chat from '../components/Chat';
import Map from "../components/Map";

import { AuthContext } from '../context/context';

const URL = import.meta.env.VITE_BACKEND_URL;

function Planning() {

    const { isLoggedIn, isSurveyFilledOut, fillSurvey } = useContext(AuthContext);

    const [waypoints, setWaypoints] = useState([
        "Rocco's Tavern",
        "Poppy",
        "Muscle Beach"
    ]);

    const sendSurvey = () => {
        axios.post(URL + '/survey', {
            username: localStorage.getItem("currentUser"),
        })
        .then((response) => {
            console.log(response);
            fillSurvey();
        })
        .catch((error) => { console.log(error); });
    }

    useEffect(() => {}, [waypoints]);

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
                            <button onClick={sendSurvey}>Submit survey</button>
                        </div>
                    ) : (
                        <div>
                            <Chat setWaypoints={setWaypoints}/>
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