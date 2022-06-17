import React, { Component } from "react";
import {MapContainer, Marker, TileLayer, Popup} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import point from '../map-marker-icon.png';

// An interactive map where users can see points with temps
class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // make a map out of the given weather info
            markers: null
        }
    }

    componentDidMount() {
        this.setState({
            markers: [[]]
        })
    }

    componentDidUpdate(prevProps, prevState, ss) {
        if (this.props.weatherInfo !== prevProps.weatherInfo) {
            this.setMarkers();
        }
    }

    updatePoints() {
        let tempMaps = [[]];
        console.log("prop length:")
        console.log(this.props.weatherInfo.length);
        for (let i = 1; i < this.props.weatherInfo.length; i++) {
            // let map = [];
            // let arr = this.props.weatherInfo[i];
            // map.push('lat', arr[0]);
            // map.push('long', arr[1]);
            // map.push('cityName', arr[2]);
            // map.push('forecastDesc', arr[3]);
            // map.push('hi', arr[4]);
            // map.push('lo', arr[5]);
            //
            // tempMaps.push(map);
        }

        this.setState({
            markers: tempMaps
        })
    }

    getIcon() {
        return L.icon({
            iconUrl: require("../map-marker-icon.png"),
            iconSize: [30]
        })
    }


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

            pointList.push(
                <Marker position={[lat, long]} icon={this.getIcon()}>
                    <Popup>
                        {cityName}: {hi}/{lo}
                        {/*<h6>{cityName}</h6>*/}
                        {/*<p>{hi}/{lo}</p>*/}
                        {/*<br>{forecastDesc}</br>*/}
                    </Popup>
                </Marker>);
        }

        console.log("pointList: ");
        console.log(pointList);
        this.setState({
            markers: pointList
        })
    }

    render() {
        return (
            <div id="map">

                <MapContainer center={[47.7511, -120.7401]} zoom={7} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {this.state.markers}
                </MapContainer>

                {/*<>*/}
                {/*    {this.props.weatherInfo.map(({lat, long, city, forecast, lo, hi}) => (*/}
                {/*        <p key={city.toString()}>hello {city}.</p>*/}

                {/*    ))}*/}
                {/*</>*/}
            </div>

        );
    }
}

export default Map; // Don’t forget to use export default!


