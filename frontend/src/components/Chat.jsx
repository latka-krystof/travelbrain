import { useState } from 'react'
import axios from 'axios';

const URL = import.meta.env.VITE_BACKEND_URL;
const location = "Los Angeles, CA"

function Chat() {

    const [itinerary, setItinerary] = useState(null);

    const getItinerary = (location) => {
        axios.post(URL + '/chat/response', {
            location: location
        })
          .then((response) => {
            console.log(response)
            setItinerary(response.data)
          })
          .catch((error) => console.log(error))
    }

    return (
        <div>
            <button onClick={() => getItinerary(location)}>Get Itinerary</button>
            {itinerary && 
                <div>
                    <p>{itinerary.plan.content}</p>
                    {itinerary.places}
                </div>}
        </div>
    )
}

export default Chat
