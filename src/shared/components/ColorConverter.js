import React from "react";
import injectTapEventPlugin from "react-tap-event-plugin";
import mui, { TextField, SelectField, RaisedButton } from "material-ui";

let ThemeManager = new mui.Styles.ThemeManager();

export default class ColorConverter extends React.Component {

    constructor() {
        super();
        this._handleChangedColorTarget = this._handleChangedColorTarget.bind(this);
    }

    render() {
        return (
            <p>Color Converter</p>
        );
    }
}