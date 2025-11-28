import React, { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Coverage = () => {
  const [serviceCenters, setServiceCenters] = useState([]);
  const position = [23.8103, 90.4125];
  const mapRef = useRef(null);

  useEffect(() => {
    fetch(`serviceCenter.json`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setServiceCenters(data);
      });
  }, []);

  const searchHandler = (e) => {
    e.preventDefault();
    const location = e.target.location.value;
    const district = serviceCenters.find((c) =>
      c.district.toLowerCase().includes(location.toLowerCase())
    );
    if (district) {
      const coOrdinator = [district.latitude, district.longitude];
      //   console.log(district, coOrdinator);
      mapRef.current.flyTo(coOrdinator, 14);
    }
  };

  return (
    <div className=" mt-5 w-full h-[800px]">
      <div>
        <h2 className="font-bold text-5xl text-secondary">
          We are available in 64 districts
        </h2>
      </div>
      {/* search  */}
      <div>
        <form className="py-5" onSubmit={searchHandler}>
          <label className="input">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              type="search"
              name="location"
              required
              placeholder="Search"
            />
          </label>
        </form>
      </div>
      {/* map  */}
      <div>
        <MapContainer
          center={position}
          zoom={8}
          scrollWheelZoom={false}
          className="h-[800px]"
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {serviceCenters.map((serviceCenter, index) => (
            <Marker
              key={index}
              position={[serviceCenter.latitude, serviceCenter.longitude]}
            >
              <Popup>
                <strong>{serviceCenter.district}</strong> <br />
                Service Area: {serviceCenter.covered_area.join(", ")}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
