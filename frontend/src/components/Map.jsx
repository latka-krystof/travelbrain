const MAPS_KEY = import.meta.env.VITE_MAPS_KEY;

function Map({origin, destination, waypoints}) {
 
  const MAPS_KEY = import.meta.env.VITE_MAPS_KEY;

  const encodedWaypoints = waypoints.map((waypoint) => encodeURIComponent(waypoint)).join('|');

  const src = `https://www.google.com/maps/embed/v1/directions?key=${MAPS_KEY}&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&waypoints=${encodedWaypoints}`;

  return (
    <div>
      <iframe
        src={src}
        width="600"
        height="450"
        style={{ border: "0" }}
        allowFullScreen=""
        loading="lazy"
      ></iframe>
    </div>
  )
  }

export default Map;