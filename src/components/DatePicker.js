import React, { Component } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

// A calendar where users can select a date
class DatePicker extends Component {
    constructor() {
        super();
    }

    handleChange = (date) => {
        let now = new Date();
        let milliDiff = date - now;
        let daysDiff = Math.ceil(milliDiff / (1000 * 3600 * 24));
        if (daysDiff > 7) {
            alert("please choose a date that is at most a week from today");
        } else {
            this.props.handleDateChange(date);
        }
    }

    render() {
        return(
            <>
                <h1>Display forecast for:</h1>
                <Calendar onChange={this.handleChange}/>
            </>
        )
    }
}

export default DatePicker; // Don’t forget to use export default!