import React from 'react';
import UIButton from './mui/UIButton.js';
import UISelect from './mui/UISelect.js';

class Dice extends React.Component {

    constructor() {
        super();
        this._handleRoll = this._handleRoll.bind(this);
        this._handleAddDie = this._addDie.bind(this);
        this.defaultEyes = 6;
        this.state = {
            dice: []
        };
    }

    _addDie() {
        var dice = this.state.dice;
        dice.push({
            eyes: this.refs.dieEyes.getValue(),
            number: 0
        });
        this.setState({
            dice: dice
        });
    }

    _handleRoll() {

        var dice = this.state.dice;
        if (dice.length == 0) {
            return;
        }

        var newDice = []
        var d;
        for (d of dice){
            var number = (Math.floor(Math.random() * d.eyes) + 1);
            //console.log("new die: ", d.eyes, "number: ", number);
            newDice.push({
                eyes: d.eyes,
                number: number
            });
        }

        this.setState({
            dice: newDice
        });
    }

    render() {

        var dieEyes = [
            //{ payload: 3, text: "3"},
            { payload: 4, text: "4"},
            //{ payload: 5, text: "5"},
            { payload: 6, text: "6"},
            //{ payload: 7, text: "7"},
            { payload: 8, text: "8"},
            //{ payload: 9, text: "9"},
            { payload: 10, text: "10"},
            //{ payload: 11, text: "11"},
            { payload: 12, text: "12"},
            //{ payload: 13, text: "13"},
            //{ payload: 14, text: "14"},
            //{ payload: 15, text: "15"},
            //{ payload: 16, text: "16"},
            //{ payload: 17, text: "17"},
            //{ payload: 18, text: "18"},
            //{ payload: 19, text: "19"},
            { payload: 20, text: "20"}
        ];

        var dice = this.state.dice.map(d => {
            return (
                <Die number={d.number}/>
            );
        })

        return (
            <div className="mui-panel">
            <div className="mui-container">
                <div className="mui-row" id="about-row">

                </div>
                <div className="mui-row" id="die-options-row">
                    <div className="mui-col-md-12">
                        <UIButton
                            label="Add die"
                            primary={true}
                            onClick={this._handleAddDie} />
                        <UISelect
                            menuItems={dieEyes}
                            ref="dieEyes"
                            value={this.defaultEyes}
                            labelText="Eyes"
                            style={{width: "100px", marginLeft: "30px"}}/>
                    </div>
                </div>
                <div className="mui-row">
                    <div className="mui-text-center">
                        <div className="mui-col-md-12" id="dices-row">
                            {dice}
                        </div>
                    </div>
                </div>
                <div className="mui-row" id="roll-row">
                    <div className="mui-col-md-12">
                        <UIButton
                            label="Roll"
                            primary={true}
                            onClick={this._handleRoll}
                            id="btn-roll" />
                        </div>

                </div>
            </div>
            </div>
        );
    }
}

class Die extends React.Component {

    constructor() {
        super();
    }

    render() {
        return (
            <div className="dice-row">
                <h1>{this.props.number}</h1>
            </div>
        );
    }
}

Die.PropTypes = {
    number: React.PropTypes.number.isRequired
}
Die.defaultProps = {
    number: 1
}


Dice.toolTitle = "Dice roll";
Dice.toolDescription = "Add as many dice and roll them. Totally legit digital replacement for board game dice!";
Dice.toolMetaDescription = "Online dice roll for board games like yatzy, Dungeons and Dragons and many more. Add dice with appropriate amount of eyes and roll.";

module.exports = Dice;