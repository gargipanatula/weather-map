import React, { Component } from 'react';
import { DataProcessor } from "../calculations/DataProcessor";

// Text area where users can input a list of cities and their states
class CityList extends Component {
    constructor() {
        super();
        this.state = {
            display: "Seattle, WA\n"
        };
    }

    // Updates text box to reflect user input
    onInputChange = (event) => {
        this.setState({
            display: event.target.value,
        })
    }

    // Sends up whatever the user inputted so it can be turned into markers
    onDrawClick = async () => {
        let dpPromise = new DataProcessor(this.state.display.split('\n'), this.props.date);
        let dp = await dpPromise;
        // get the coordinates in a promise
        let valuePromise = dp.getWeatherData();
        let value = await valuePromise;

        this.props.setWeatherInfo(value);
    }

    // clears the display and sends up an empty list of cities so that no markers show
    onClearClick () {
        this.setState({
            display: ""
        })
        this.props.setWeatherInfo([[]]);
    }

    render() {
        return(
            <>
                <h2>Input cities:</h2>
                <textarea
                    rows={5}
                    cols={30}
                    onChange={this.onInputChange}
                    value={this.state.display}
                /> <br/>
                <button className='button' onClick={this.onDrawClick}>Draw</button>
                <button className='button' onClick={this.onClearClick}>Clear</button>
            </>
        )
    }
}

export default CityList;