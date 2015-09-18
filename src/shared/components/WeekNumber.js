import React from "react";
import Moment from "moment";

export default class WeekNumber extends React.Component {
    render() {


    	var date = new Date();
    	var weekday = Moment(date).week();
    	console.log(weekday);

    	// TODO: Different week for people around the world. 
    	//Client should inject correct day, location based.

        return (
        	<div> 
        		<p className="metaText">Current week: </p>
        		<p className="bigtext">{weekday}</p>
        	</div>);
    }
}
