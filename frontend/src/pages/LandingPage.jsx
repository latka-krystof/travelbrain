import { Link } from "react-router-dom";
import { useState } from 'react';

function LandingPage() {

    return (
        <div>
        <h1 className="text-5xl font-bold">TravelBrain</h1>
        <h2 className="text-4xl font-medium">Your Last-Minute Travel Companion</h2>
        <div className="mt-8">
        <Link to='/register' className="py-2 px-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">Register now</Link>
        </div>
      </div>
    )
}

export default LandingPage 

