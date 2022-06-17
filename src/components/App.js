import React, { Component } from 'react';
import './App.css';
import DatePicker from "./DatePicker";
import CityList from "./CityList";
import Map from "./Map";

// An overarching component that supports the app
class App extends Component {
  constructor() {
    super();
    this.state = {
      date: new Date(), // date that the user has selected
      weatherInfo: [[]] // holds [lat, long, cityName, forecastDesc, loTemp, hiTemp] for inputted cities
    };
  }

  // passed down to DatePicker to update the date we display the forecast for
  update_date = (date_) => {
    this.setState({
      date: date_
    });
  }

  // passed down to CityList to update the weather info we need to display
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
              weatherInfo={this.state.weatherInfo}
          />
        </div>

    )
  };
}

export default App;
