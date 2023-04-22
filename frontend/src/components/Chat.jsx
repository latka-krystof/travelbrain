import { useState } from 'react'
import axios from 'axios';

const URL = import.meta.env.VITE_BACKEND_URL;
const location = "Los Angeles, CA"

function Chat() {

    const [itinerary, setItinerary] = useState(null);

    const getItinerary = (location) => {
        axios.get(URL + '/chat/response', {
            location: location
        })
          .then((response) => {
            if (response.data) {
                console.log(response.data.choices[0].message.content)
                setItinerary(response.data.choices[0].message.content)
            } else {
                console.log(response)
            }
          })
          .catch((error) => console.log(error))
    }

    return (
        <div>
            <button onClick={() => getItinerary(location)}>Get Itinerary</button>
            {itinerary && <p>{itinerary}</p>}
        </div>
    )
}

export default Chat
