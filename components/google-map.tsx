"use client";
import React from "react";
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  MarkerClusterer,
  InfoWindowF,
} from "@react-google-maps/api";
import { Home } from "lucide-react";
import { Marker } from "@/app/page";

interface GoogleMapProps {
  markers: Marker[];
}
const GoogleMapComponent = ({ markers }: GoogleMapProps) => {
  const [selectedPlace, setSelectedPlace] = React.useState<Marker | null>(null);
  const containerStyle = {
    width: "100vw",
    height: "100vh",
  };

  const options = {
    mapId: "YOUR_MAP_ID",
    mapTypeControl: false,
    streetViewControl: false,
  };

  const center = { lat: 50.7753, lng: 6.0839 };

  const { isLoaded } = useJsApiLoader({
    // id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  });

  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  return (
    isLoaded && (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        options={options}
      >
        <MarkerClusterer
          options={{
            imagePath:
              "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
          }}
        >
          {(clusterer) => (
            <>
              {markers.map((marker, index) => (
                <MarkerF
                  key={index}
                  position={marker.position}
                  clusterer={clusterer}
                  onClick={() => {
                    marker === selectedPlace
                      ? setSelectedPlace(null)
                      : setSelectedPlace(marker);
                  }}
                />
              ))}
              {selectedPlace && (
                <InfoWindowF
                  position={selectedPlace.position}
                  onCloseClick={() => setSelectedPlace(null)}
                  zIndex={100}
                  options={{
                    pixelOffset: {
                      width: 0,
                      height: -40,
                      equals: () => false,
                    },
                  }}
                >
                  <div className="space-y-2">
                    <h1 className="font-bold text-xl">{selectedPlace.name}</h1>
                    <p className="max-w-40 overflow-hidden">Beschreibung</p>
                    <p>
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${selectedPlace.position.lat},${selectedPlace.position.lng}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-500"
                      >
                        Route
                      </a>
                    </p>
                  </div>
                </InfoWindowF>
              )}
            </>
          )}
        </MarkerClusterer>
      </GoogleMap>
    )
  );
};

export default GoogleMapComponent;
