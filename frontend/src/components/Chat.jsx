import { useState, useEffect, useRef } from 'react'
import axios from 'axios';

const URL = import.meta.env.VITE_BACKEND_URL;
const MAPS_KEY = import.meta.env.VITE_MAPS_KEY;

function Chat({setWaypoints}) {

    const [itinerary, setItinerary] = useState(null);
    const [city, setCity] = useState("");
    const inputRef = useRef(null); 

    useEffect(() => {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${MAPS_KEY}&libraries=places`;
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current);
            autocomplete.addListener("place_changed", () => {
                const place = autocomplete.getPlace();
                const formattedAddress = place.formatted_address;
                setCity(formattedAddress);
            });
        };

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const getItinerary = (city) => {
        axios.post(URL + '/chat/response', {
            location: city
        })
          .then((response) => {
            console.log(response)
            setItinerary(response.data)
            setWaypoints(response.data.places)
          })
          .catch((error) => console.log(error))
    }

    const handleGetItinerary = () => {
        axios.post(URL + '/survey/responses', {
            username: localStorage.getItem("currentUser"),
        })
          .then((response) => {
            console.log(response);
            getItinerary(city);
          })
          .catch((error) => console.log(error))
    }

    return (
        <div>
            <label htmlFor="city"></label>
            <div className='flex flex-row'>
                <input className='bg-gray-100 w-64 p-2 flex items-center mb-3 rounded-md border-2 border-backgroundc-200' type="text" id="city" ref={inputRef} />
                <button className='border-2 inline-block font-semibold text-black px-4 py-2 rounded-md mb-3 mx-3' onClick={handleGetItinerary}>Get Itinerary</button>
            </div>
            {itinerary && 
            <div>
                {itinerary.plan.map((item, index) => (
                    <p key={index}>{item}</p>
                ))}
            </div>}
        </div>
    )
}

export default Chat
