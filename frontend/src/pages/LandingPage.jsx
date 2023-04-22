import { Link } from "react-router-dom";

function LandingPage() {
    return (
        <div>
            <h1>TravelBrain.</h1>
            <h2>Your lastminute travel companion.</h2>
            <Link to='/register'>Register here!</Link>
        </div>
    )
}

export default LandingPage