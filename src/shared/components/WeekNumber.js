import React from "react";
import Moment from "moment";

class WeekNumber extends React.Component {
    render() {


    	var date = new Date();
    	var weekday = Moment(date).week();
    	console.log(weekday);

    	// TODO: Different week for people around the world. 
    	//Client should inject correct day, location based.

        return (
        	<div>
				<div className="mui-ro">
					<h1>{WeekNumber.toolTitle}</h1>
					<p>{WeekNumber.toolDescription}</p>
				</div>
        		<p className="metaText">Current week: </p>
        		<p className="bigtext">{weekday}</p>
        	</div>);
    }
}

WeekNumber.toolTitle = "WeekNumber calculator";
WeekNumber.toolDescription=  "The body mass index is a value based on an indviduals weight and height";

module.exports = WeekNumber;