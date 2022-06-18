import ContainerColumn from './ContainerColumn';
import Map  from './Map';
import React, { Component } from "react";
import './App.css';

// contains a column of two components (map and text entry box) and then a map to the right of that column
class ContainerRow extends Component {
    render(){
        return (
            <div className='rowC'>
                <ContainerColumn
                    handleDateChange={this.props.handleDateChange}
                    setWeatherInfo={this.props.setWeatherInfo}
                    date={this.props.date}
                />
                <Map
                    weatherInfo={this.props.weatherInfo}
                    temp={this.props.temp}
                />
            </div>
        );
    }
}

export default ContainerRow