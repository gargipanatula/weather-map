import React, { Component } from 'react';
import { WeatherData } from './WeatherData';

// turns user given data into forecasts
export class DataProcessor {
    constructor(locations_, date) {
        this.locations = locations_
        this.date = date
    }

    // sets weather data and coordinates for every entry in the textbox
    getWeatherData = async () => {
        // get coordinates and city name for passed in cities
        let tempPromise = this.getCoords();
        let temp = await tempPromise;

        // make structure to hold weather data
        let data = [];

        // use those coordinates to get forecast data
        for (let i = 0; i < temp.length; i++) {
            try {
                let forecastPromise = this.getForecast(temp[i].getX(), temp[i].getY(), temp[i].getName());
                let forecastData = await forecastPromise;


                let locationData = [temp[i].getY(), temp[i].getX(), temp[i].getName()];

                console.log("locationData");
                console.log(locationData);
                console.log("forecastData");
                console.log(forecastData);
                let comb = locationData.concat(forecastData);
                data.push(comb);
            } catch (e) {
                alert("error with getting forecast");
            }
            console.log(JSON.stringify(data));
        }

        console.log(data.length);
        console.log(data);

        // return the complete set of data for the inputted cities (coordinates, city name, forecast, hi, lo)
        return data;
    }

    // get coordinates for each city in the textbox
    getCoords = async () => {
        let entries = this.locations; // ["city state", "city1 state1"]
        let temp = [];

        // add data for each entry using the api
        for (let i = 0; i < entries.length; i++) {
            // make an array that splits the city and state
            let cityState = entries[i].split(',');

            // error case for empty lines
            if (cityState[0] === '') {
                continue;
            }
            // object to hold retrieved data for this entry
            let wd = new WeatherData();

            // turn the city name into one long string so the api can process it
            let city = "";
            for (let i = 0; i < cityState.length-1; i++) {
                city += cityState[i].trim();
            }

            // the last element after splitting will be the state name
            let state = cityState[cityState.length-1];

            try {
                // https://developers.arcgis.com/rest/geocode/api-reference/geocoding-find-address-candidates.htm#ESRI_SECTION1_DC481411A8494D809D3501B79059DBA6
                // get location data
                let url = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?address=" + city + "&region=" + state + "&f=pjson";
                let responsePromise = fetch(url);
                let response = await responsePromise;

                if (!response.ok) {
                    alert("error code on DataProcessor.41");
                    return;
                }

                // parse the response
                let textPromise = response.text();
                let text = await textPromise;
                const obj = JSON.parse(text);

                // ensure city is valid
                if (obj.candidates.length === 0) {
                    alert("invalid city " + entries[i]);
                    continue;
                }

                // set coordinates and name for city based on retrieved data
                wd.setX(obj.candidates[0].location.x);
                wd.setY(obj.candidates[0].location.y);
                wd.setName(obj.candidates[0].address.split(',')[0]);

                // add that data to temp array
                temp[i] = wd;
            } catch (e) {
                alert("error contacting the server");
                console.log(e)
            }
        }

        return temp;
    }


    // get forecast for a given set of coordinates
    // https://weather-gov.github.io/api/general-faqs
    getForecast = async (x, y, name) => {
        let h = new Headers({
            "Accept"       : "application/json",
            "User-Agent"   : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.63 Safari/537.36"
        });

        let hi = -150;
        let lo = 150;
        let desc = "";

        try {
            // https://weather-gov.github.io/api/general-faqs
            // get coordinates (rounded to 4 decimal places for the api)
            let lat = Math.round((y + Number.EPSILON) * 10000) / 10000;
            let long = Math.round((x + Number.EPSILON) * 10000) / 10000;

            // make call to get info about this location
            let url = "https://api.weather.gov/points/" + lat + "," + long;
            let responsePromise = fetch(url, {
                method: 'GET',
                headers: h,
                mode: 'cors'
            });
            let response = await responsePromise;

            if (!response.ok) {
                alert("could not find forecast for " + name);
                return;
            }

            // get the text from the response
            let textPromise = response.text();
            let text = await textPromise;
            const obj = JSON.parse(text);

            // get the url that we can call to make the actual forecast call
            let forecastUrl = obj.properties.forecast;
            let fResponsePromise = fetch(forecastUrl, {
                method: 'GET',
                headers: h,
                mode: 'cors'
            });
            let fResponse = await fResponsePromise;
            if (!fResponse.ok) {
                return;
            }
            // parse the response
            let ftextPromise = fResponse.text();
            let fText = await ftextPromise;

            // find the correct period of time to display the data on (ensure it matches chosen date)
            const fobj = JSON.parse(fText);
            let periods = fobj.properties.periods;
            for (let i = 0; i < periods.length; i++) {
                // get the start time of this period
                let period = periods[i];
                let startTime = period.startTime;
                let start = new Date(startTime);

                // compare the day of start time with day of chosen date
                // if dates are same, we should consider these for hi and lo
                if (start.getDay() === this.date.getDay()) {
                    if (period.isDaytime) {
                        desc = period.shortForecast;
                    }
                    if (period.temperature > hi) {
                        hi = period.temperature;
                    }
                    if (period.temperature < lo) {
                        lo = period.temperature;
                    }
                }
            }

        } catch (e) {
            alert("incorrect formatting of cities. It should be city, state e.g. Seattle, WA");
            console.log(e)
        }

        return [desc, lo, hi];
    }
}