import { useState, useEffect, useRef } from 'react'
import axios from 'axios';

const URL = import.meta.env.VITE_BACKEND_URL;

function Chat() {

    const [itinerary, setItinerary] = useState(null);
    const [city, setCity] = useState("");
    const inputRef = useRef(null); 


    useEffect(() => {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAu7r8XYqEzBirJYpZTKHCghaXnJk0pU0g&libraries=places`;
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
          })
          .catch((error) => console.log(error))
    }

    const handleGetItinerary = () => {
        getItinerary(city);
    }

    return (
        <div>
            <label htmlFor="city">Enter City:</label>
            <input type="text" id="city" ref={inputRef} />
            <button onClick={handleGetItinerary}>Get Itinerary</button>
            {itinerary && 
                <div>
                    <p>{itinerary.plan.content}</p>
                    {itinerary.places}
                </div>}
        </div>
    )
}

export default Chat
