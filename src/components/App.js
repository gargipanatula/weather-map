import React, { Component } from 'react';
import './App.css';
import ContainerRow from "./ContainerRow"
import background from "../background.jpg"

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
        <div className="App" style={{ backgroundImage: `url(${background})` }}>
            <h1>Welcome to Weather App!</h1>
            <p>Get a forecast for your favorite cities</p>
            <ContainerRow
                handleDateChange={this.update_date}
                setWeatherInfo={this.update_weather_info}
                date={this.state.date}
                weatherInfo={this.state.weatherInfo}
                temp={70}
            />
        </div>
    )
  };
}

export default App;
