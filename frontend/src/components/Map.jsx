const MAPS_KEY = import.meta.env.VITE_MAPS_KEY;

function Map({location}) {

  return (
    <div>
      <iframe
        src={`https://www.google.com/maps/embed/v1/place?key=${MAPS_KEY}&q=${location}`}
        width="600"
        height="450"
        style={{ border: "0" }}
        allowFullScreen=""
        loading="lazy"
      ></iframe>
    </div>
  )
}

export default Map