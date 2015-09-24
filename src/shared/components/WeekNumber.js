import React from "react";
import Moment from "moment";

class WeekNumber extends React.Component {
    render() {

    	var date = new Date();
    	var weeknumber = Moment(date).isoWeek();

    	// TODO: Different week for people around the world. 
    	//Client should inject correct day, location based.

        return (
        	<div>
				<div className="mui-row">
					<div className="mui-col-md12 mui-text-center">
						<h1>{WeekNumber.toolTitle}</h1>
					</div>
				</div>
				<div className="mui-row">
					<div className="mui-col-md12">
						<div className="mui-text-display4 mui-text-accent mui-text-center" id="weeknumber">
							{{weeknumber}}
						</div>
					</div>
				</div>
				<div className="mui-row">
					<div className="mui-col-md12 mui-text-center">
						<p>{WeekNumber.toolDescription}</p>
					</div>
				</div>
        	</div>);
    }
}

WeekNumber.toolTitle = "What week is it?";
WeekNumber.toolDescription=  "This is the current ISO week of the year.";

module.exports = WeekNumber;