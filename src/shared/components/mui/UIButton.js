/**
 * Created by Olav on 10/3/2015.
 */
import React from "react";

class UIButton extends React.Component {
    constructor() {
        //TODO: Color option, and raised flat etc
        super();
    }

    render() {
        return (
            <button className="mui-btn"
                data-mui-color="primary"
                onClick={this.props.onClick}>
            {this.props.label}
        </button>
        )
    }
};

module.exports = UIButton;