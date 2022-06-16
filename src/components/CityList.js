import React, { Component } from 'react';
import { DataProcessor } from "../calculations/DataProcessor";

// Text area where users can input a list of cities and their states
class CityList extends Component {
    constructor() {
        super();
        this.state = {
            display: "Seattle WA\n"
        };
    }

    onInputChange = (event) => {
        this.setState({
            display: event.target.value, // updates text box to reflect input
        })
    }

    // draw
    onDrawClick = async () => {
        let dp = await new DataProcessor(this.state.display.split('\n'), this.props.date);
        let value = await dp.getCoords();
        this.props.setWeatherInfo(value);

        // let promise = new Promise(resolve => {
        //     resolve(dp.getCoords());
        // });
        //
        // promise.then(value => {
        //     this.props.setWeatherInfo(value);
        // })

    }

    onClearClick () {
        this.setState({
            display: ""
        })
        this.props.setWeatherInfo([[]]);
        // when we clear click, pass up empty coordinates to map
    }

    render() {
        return(
            <>
                <h1>Input cities here</h1>
                <h3>Format: city state</h3>
                <textarea
                    rows={5}
                    cols={30}
                    onChange={this.onInputChange}
                    value={this.state.display}
                /> <br/>
                <button onClick={this.onDrawClick}>Draw</button>
                <button onClick={this.onClearClick}>Clear</button>
            </>
        )
    }
}

export default CityList; // Don’t forget to use export default!