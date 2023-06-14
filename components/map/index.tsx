"use client";

import GoogleMapReact from "google-map-react";
import { useState } from "react";
import style from "./styles.module.scss";
import ProfileQuickView from "@components/profileQuickView";

const Map = () => {
  const [center, setCenter] = useState({ lat: -25.850187, lng: 28.2298 });
  const defaultZoom = 10;
  const [zoom, setZoom] = useState(defaultZoom);

  interface MarkerProps {
    lat: number;
    lng: number;
  }

  const Marker: React.FC<MarkerProps> = ({ lat, lng }) => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <div
          style={{
            position: "absolute",
            transform: "translate(-50%, -100%)", // Adjust positioning as needed
          }}
          onClick={() => {
            setOpen(true);
          }}
          className="markerStick"
        >
          <img
            src="/assets/images/holder.png" // Replace with the path to your image
            alt="Marker Image"
            style={{
              width: "20px", // Adjust size as needed
              height: "20px",
            }}
          />
        </div>
        <ProfileQuickView setOpen={setOpen} open={open} />
      </>
    );
  };

  const mapOptions = {
    restriction: {
      latLngBounds: {
        north: -25.850187,
        south: -25.850187,
        west: 28.2298,
        east: 28.2298,
      },
    },
  };
  const markers = [
    { id: 1, lat: -25.83078657574137, lng: 28.195243791245624 },
    { id: 5, lat: -25.8405355, lng: 28.1912703 },
    { id: 4, lat: -25.8618042, lng: 28.2501886 },
    { id: 2, lat: -25.7534891, lng: 28.2078956 },
  ];

  return (
    <div className={style.mapContainer}>
      <div className="live-map" style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          defaultCenter={center}
          defaultZoom={zoom}
          options={mapOptions as any}
        >
          {markers.map(({ lat, lng, id }) => (
            <Marker lat={lat} lng={lng} key={id} />
          ))}
        </GoogleMapReact>
      </div>
    </div>
  );
};

export default Map;
