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

    const getItinerary = (city, age, travelers, historical, time, budget, personality, adventure, open, organized) => {
        axios.post(URL + '/chat/response', {
            location: city, 
            age: age,
            travelers: travelers,
            historical: historical,
            time: time, 
            budget: budget,
            personality: personality,
            adventure: adventure,
            open: open,
            organized: organized
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
            if (response && response.data) {
                const data = response.data;
                getItinerary(city, data.Age, data.travellingwith, data.Historical, data.slidervalues[0], data.slidervalues[1], data.slidervalues[2], data.slidervalues[3], data.slidervalues[4], data.slidervalues[5]);
            } else {
                console.log('Invalid response');
            }
          })
          .catch((error) => console.log(error))
    }
    

    return (
        <div>
            <label htmlFor="city">Enter City:</label>
            <input type="text" id="city" ref={inputRef} />
            <button onClick={handleGetItinerary}>Get Itinerary</button>
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
