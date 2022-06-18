import DatePicker from './DatePicker';
import CityList  from './CityList';
import React, { Component } from "react";
import './App.css';

class ContainerColumn extends Component {
    render(){
        return (
            <div className='columnC'>
                <DatePicker
                    handleDateChange={this.props.handleDateChange}
                />
                <CityList
                    setWeatherInfo={this.props.setWeatherInfo}
                    date={this.props.date}
                />
            </div>
        );
    }
}

export default ContainerColumn