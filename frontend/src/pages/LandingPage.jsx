import { Link } from "react-router-dom";
import Chat from '../components/Chat';

function LandingPage() {
    return (
        <div>
            <h1>TravelBrain.</h1>
            <h2>Your lastminute travel companion.</h2>
            <Link to='/register'>Register here!</Link>
            <Chat/>
        </div>
    )
}

export default LandingPage