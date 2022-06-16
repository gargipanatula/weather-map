import React, { Component } from 'react';
import { WeatherData } from './WeatherData';

// turns user given data into
export class DataProcessor {
    constructor(locations_, date) {
        this.locations = locations_
        this.date = date
    }

    // sets coordinates and names for each entry in the textbox
    getCoords = async () => {
        // store the passed in data
        let entries = this.locations; // ["city state", "city1 state1"]

        // instantiate empty WeatherData objects in a temp array
        let temp = []

        // add data for each entry using the api
        for (let i = 0; i < entries.length; i++) {
            let cityState = entries[i].split(' ');
            // error case for empty lines
            if (cityState[0] === '') {
                continue;
            }

            // object to hold retrieved data for this entry
            let wd = new WeatherData();

            try {
                // https://developers.arcgis.com/rest/geocode/api-reference/geocoding-find-address-candidates.htm#ESRI_SECTION1_DC481411A8494D809D3501B79059DBA6
                // get location data
                let url = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?address=" + cityState[0] + "&region=" + cityState[1] + "&f=pjson";
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
                if (obj.candidates.length === 0) {
                    // error case for invalid city
                    alert("invalid city " + entries[i]);
                    continue;
                }

                // set coordinates and name
                wd.setX(obj.candidates[0].location.x);
                wd.setY(obj.candidates[0].location.y);
                wd.setName(obj.candidates[0].address.split(',')[0]);

                // add to temp array
                temp[i] = wd;
            } catch (e) {
                alert("error contacting the server");
                console.log(e)
            }
        }

        let data = [[]];
        // turn those coordinates into forecast data
        for (let i = 0; i < temp.length; i++) {
            try {
                // get the weather info for the ith coordinates
                // let promise = new Promise(resolve => {
                //     resolve(this.getForecast(temp[i].getX(), temp[i].getY()));
                // });

                let forecastPromise = this.getForecast(temp[i].getX(), temp[i].getY());
                let forecast = await forecastPromise;

                let valuePromise = forecast.json();
                let valueJson = await valuePromise;

                let valueArr = JSON.parse(valueJson);
                let value = await valueArr;

                let name = [temp[i].getY(), temp[i].getX(), temp[i].getName()];
                let comb = name.concat(value);
                data.push(comb);

                // add that info to an array with our existing info
                // promise.then(value => {
                //     let name = [temp[i].getY(), temp[i].getX(), temp[i].getName()];
                //     let comb = name.concat(value);
                //     data.push(comb);
                // });

            } catch (e) {
                alert("error with getting forecast");
            }
        }

        return data;
    }

    // get forecast for a given set of coordinates
    // https://weather-gov.github.io/api/general-faqs
    getForecast = async (x, y) => {
        let h = new Headers({
            "Accept"       : "application/json",
            "User-Agent"   : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.63 Safari/537.36"
        });

        let hi = -150;
        let lo = 150;
        let desc = "";

        try {
            // https://weather-gov.github.io/api/general-faqs
            // get forecast data from the api
            // get coordinates (rounded to 4 decimal places for the api)
            let lat = Math.round((y + Number.EPSILON) * 10000) / 10000;
            let long = Math.round((x + Number.EPSILON) * 10000) / 10000;
            // make call to get forecast
            let url = "https://api.weather.gov/points/" + lat + "," + long;
            let responsePromise = await fetch(url, {
                method: 'GET',
                headers: h,
                mode: 'cors'
            });
            let response = await responsePromise;

            if (!response.ok) {
                alert("error code on DataProcessor.110");
                return;
            }

            let textPromise = response.text();
            let text = await textPromise;
            const obj = JSON.parse(text);

            let forecastUrl = obj.properties.forecast;

            // make call to get forecast for the given day
            let fResponsePromise = fetch(forecastUrl);
            let fResponse = await fResponsePromise;
            if (!fResponse.ok) {
                alert("error code on DataProcessor.122");
                return;
            }

            let ftextPromise = fResponse.text();
            let fText = await ftextPromise;

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
            alert("error contacting the server");
            console.log(e)
        }

        return [desc, lo, hi];
    }
}