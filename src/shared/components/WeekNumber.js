import React from "react";
import Moment from "moment";

class WeekNumber extends React.Component {

	constructor() {
		super();

		this.state = {
			weeknumber: null
		};
	}

	componentDidMount() {
		// Update state to force re-render.
		// This will ensure that the component is rendered on the client, potentially fixing timezone issues.
		var date = new Date();
		var weeknumber = Moment(date).isoWeek();
		this.setState({
			weeknumber: weeknumber
		});
	}

    render() {

    	//var date = new Date();
    	//var weeknumber = Moment(date).isoWeek();

        return (
		<div className="mui-panel">
        	<div className="mui-container">
				<div className="mui-row">
					<div className="mui-col-md12 mui-text-center">
						<h1>{WeekNumber.toolTitle}</h1>
					</div>
				</div>
				<div className="mui-row">
					<div className="mui-col-md12">
						<div className="mui-text-display4 mui-text-accent mui-text-center" id="weeknumber">
							{this.state.weeknumber}
						</div>
					</div>
				</div>
				<div className="mui-row">
					<div className="mui-col-md12 mui-text-center">
						<p>{WeekNumber.toolDescription}</p>
					</div>
				</div>
        	</div>
		</div>
		);
    }
}

WeekNumber.toolTitle = "What week is it?";
WeekNumber.toolDescription =  "This is the current ISO week of the year.";
WeekNumber.toolMetaDescription = "Find the current week number of the year online. Displayed in ISO format";

module.exports = WeekNumber;