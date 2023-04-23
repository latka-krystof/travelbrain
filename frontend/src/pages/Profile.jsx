import { useContext, useState } from 'react';
import { AuthContext } from '../context/context';
import axios from 'axios';

const URL = import.meta.env.VITE_BACKEND_URL;

function Profile() {

    const [trips, setTrips] = useState(null);

    const { isLoggedIn, } = useContext(AuthContext);

    const getSavedTrips = () => {
        axios.post(URL + '/trips/get', {
            username: localStorage.getItem('currentUser'),
        })
        .then((response) => {
            console.log(response);
            setTrips(response.data.saved)
          })
          .catch((error) => console.log(error))
    }
    
    return (
        <div>
            {!isLoggedIn() ? (
                <h1 className='font-dmsans text-3xl mb-[75vh]'>Please 
                <Link to='/login' className='text-black'> log in </Link> 
                before planning a trip!</h1>
            ) : (
            <div>
                <h1>Welcome, @{localStorage.getItem("currentUser")}</h1>
                <button onClick={getSavedTrips}>Load your trips</button>
                {trips && <p>{trips}</p>}
            </div>)}
        </div>
    );
}

export default Profile;