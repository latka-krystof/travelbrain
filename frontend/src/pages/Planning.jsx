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

    const saveTrip = () => {
        axios.post(URL + '/trips/save', {
            username: localStorage.getItem('currentUser'),
            trip: waypoints
        })
        .then((response) => {
            console.log(response);
          })
          .catch((error) => console.log(error))
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
                            <Form />
                        </div>
                    ) : (
                        <div>
                                <Chat setWaypoints={setWaypoints}/>
                                <div className="flex justify-between">
                                    <div className="rounded my-5 mr-10">
                                        {waypoints && <Map
                                            origin={waypoints[0]}
                                            destination={waypoints[waypoints.length - 1]}
                                            waypoints={waypoints}
                                        />}
                                    </div>
                                    <ul className="my-5">
                                        {waypoints.map((waypoint, index) => (
                                            <li key={index}>{index + 1}. {waypoint}</li>
                                        ))}
                                    </ul>
                                </div>
                                <button className='border-2 rounded-md px-6 py-2 mb-20 inline-block font-semibold text-black' onClick={saveTrip}>Save your trip</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default Planning