import React, { Component } from "react";
import {MapContainer, Marker, TileLayer, Popup} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import point from '../red-icon.png';

// An interactive map where users can see points with temps
class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // make a map out of the given weather info
            markers: []
        }
    }

    // initializes the map to have 0 markers when first loaded
    componentDidMount() {
        this.setState({
            markers: []
        })
    }

    // updates the markers that the map displays when our list of cities update
    componentDidUpdate(prevProps, prevState, ss) {
        if (this.props.weatherInfo !== prevProps.weatherInfo) {
            this.setMarkers();
        }
    }

    // returns an icon of a red map point
    getRedIcon() {
        return L.icon({
            iconUrl: require("../red-icon.png"),
            iconSize: [30]
        })
    }

    // returns an icon of a blue map point
    getBlueIcon() {
        return L.icon({
            iconUrl: require("../blue-icon.png"),
            iconSize: [20]
        })
    }

    // creates markers off of the given weather and city data
    setMarkers() {
        let pointList = [];
        // convert each line to a Marker component
        for (let i = 0; i < this.props.weatherInfo.length; i++) {
            let arr = this.props.weatherInfo[i];

            let lat = arr[0];
            let long = arr[1];
            let cityName = arr[2];
            let forecastDesc = arr[3];
            let lo = arr[4];
            let hi = arr[5];

            try {
                // make the marker red if the temperature is above the props temp
                if (!isNaN(this.props.temp) && hi >= this.props.temp) {
                    console.log("passed check")
                    pointList.push(
                        <Marker position={[lat, long]} icon={this.getRedIcon()}>
                            <Popup>
                                <h4>{cityName}: {hi}/{lo}</h4>
                                {forecastDesc}
                            </Popup>
                        </Marker>);
                } else { // make the marker blue otherwise
                    pointList.push(
                        <Marker position={[lat, long]} icon={this.getBlueIcon()}>
                            <Popup>
                                <h4>{cityName}: {hi}/{lo}</h4>
                                {forecastDesc}
                            </Popup>
                        </Marker>);
                }
            } catch (e) {
                alert("couldn't find coordinates, please check that you've correctly\n" +
                    "spelled your cities and press the draw button again.")
            }
        }

        this.setState({
            markers: pointList
        })
    }

    render() {
        return (
            <div id="map">
                <MapContainer center={[46, -117.8344]} zoom={6} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {this.state.markers}
                </MapContainer>
            </div>

        );
    }
}

export default Map;


