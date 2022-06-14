import React, { Component } from 'react';
import './App.css';
import DatePicker from "./DatePicker";
import CityList from "./CityList";
import DataProcessor from "../calculations/DataProcessor";
import Map from "./Map";

// An overarching component that supports the app
class App extends Component {
  constructor() {
    super();
    this.state = {
      date: new Date(), // date that the user has selected
      weatherInfo: [[]]
    };
  }

  update_date = (date_) => {
    this.setState({
      date: date_
    });
  }

  update_weather_info = (info_) => {
    this.setState({
      weatherInfo: info_
    });
  }

  render() {
    return (
        <div className="App">
          <DatePicker
              handleDateChange={this.update_date}
          />
          <CityList
              setWeatherInfo={this.update_weather_info}
              date={this.state.date}
          />
          <Map
              data={this.state.weatherInfo}
          />
        </div>
    )
  };
}

export default App;
