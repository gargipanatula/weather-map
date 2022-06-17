import React, { Component } from 'react';

// Text area where users can input a list of cities and their states
class TempPicker extends Component {
    constructor() {
        super();
        this.state = {
            display: ""
        };
    }

    onInputChange = (event) => {
        this.setState({
            display: event.target.value, // updates text box to reflect input
        })
        this.props.setTemp(parseInt(event.target.value));
    }

    render() {
        return(
            <>
                <h3>What's your ideal high temp?</h3>
                <textarea
                    rows={1}
                    cols={4}
                    onChange={this.onInputChange}
                    value={this.state.display}
                /> <br/>
            </>
        )
    }
}

export default TempPicker; // Don’t forget to use export default!