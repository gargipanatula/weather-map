import React, { Component } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './App.css';

// A calendar where users can select a date
class DatePicker extends Component {
    // updates date when a user clicks a date
    handleChange = (date) => {
        // find the difference between the selected date and the current date
        let now = new Date();
        let milliDiff = date - now;
        let daysDiff = Math.ceil(milliDiff / (1000 * 3600 * 24));
        if (daysDiff > 7 || daysDiff < 0) {
            // if difference is too high or in the past, we cannot display a forecast for it
            alert("please choose a date that is at most a week from today");
        } else {
            // pass up the date to App
            this.props.handleDateChange(date);
        }
    }

    render() {
        return(
            <>
                <h2>Select a date:</h2>
                <Calendar onChange={this.handleChange}/>
            </>
        )
    }
}

export default DatePicker;