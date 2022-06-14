import { LatLngExpression } from "leaflet";
import React, { Component } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// An interactive map where users can see points with temps
class Map extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div id="map">
                <MapContainer
                    center={[47.6062, 122.3321]}
                    zoom={15}
                    scrollWheelZoom={false}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {
                        // TODO: Render map lines here using the MapLine component. E.g.
                        // <MapLine key="key1" color="red" x1={1000} y1={1000} x2={2000} y2={2000}/>
                        // will draw a red line from the point 1000,1000 to 2000,2000 on the
                        // map. Note that key should be a unique key that only this MapLine has.
                    }
                </MapContainer>
            </div>
        );
    }
}

export default Map; // Don’t forget to use export default!


