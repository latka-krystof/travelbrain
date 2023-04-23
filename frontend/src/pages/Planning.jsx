import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import Chat from '../components/Chat';
import Map from "../components/Map";
import Form from '../components/Form';

import { AuthContext } from '../context/context';

const URL = import.meta.env.VITE_BACKEND_URL;

function Planning() {

    const { isLoggedIn, isSurveyFilledOut, fillSurvey } = useContext(AuthContext);

    const [waypoints, setWaypoints] = useState([
        "UCLA, Los Angeles, CA",
        "Grand Central Market, Los Angeles, CA",
        "Venice Beach, CA"
    ]);

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
                            <h1 className='font-dmsans text-3xl mb-[10vh]'>Please fill out the survey first</h1>
                            <Form />
                        </div>
                    ) : (
                        <div>
                            <Chat setWaypoints={setWaypoints}/>
                            {waypoints && <Map
                                origin={waypoints[0]}
                                destination={waypoints[waypoints.length - 1]}
                                waypoints={waypoints}
                            />}
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