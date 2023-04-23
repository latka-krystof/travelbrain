import { Link } from "react-router-dom";
import { useState } from 'react';

import Logo from '../assets/Logo.jpg';

function LandingPage() {

    return (
        <div className="flex flex-col h-screen justify-center items-center">
        <img src={Logo} alt="TravelBrain Logo" className="w-2/3 rounded-lg"/>
        <Link to='/register' className="py-2 px-4 bg-grey-400 text-black rounded-lg shadow-md  focus:outline-none focus:ring- focus:ring-opacity-75 mb-80 border-2 font-semibold">Register now</Link>
        </div>
    )
}

export default LandingPage 

