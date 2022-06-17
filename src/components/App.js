import React, { Component } from 'react';
import './App.css';
import DatePicker from "./DatePicker";
import CityList from "./CityList";
import Map from "./Map";
import TempPicker from "./TempPicker";

// An overarching component that supports the app
class App extends Component {
  constructor() {
    super();
    this.state = {
      date: new Date(), // date that the user has selected
      weatherInfo: [[]], // holds [lat, long, cityName, forecastDesc, loTemp, hiTemp] for inputted cities
      temp: NaN
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

  update_temp = (temp_) => {
      this.setState({
          temp: temp_
      })
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
              setTemp={this.update_temp}
          />
          <TempPicker
              setTemp={this.update_temp}
          />
          <Map
              weatherInfo={this.state.weatherInfo}
              temp={this.state.temp}
          />
        </div>

    )
  };
}

export default App;
