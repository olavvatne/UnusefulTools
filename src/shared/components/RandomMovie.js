/**
 * Created by Torgeir on 13.10.2015.
 */

import React from 'react';
import UIButton from './mui/UIButton.js';

class RandomMovie extends React.Component {

    constructor() {
        super();

        this._handleRandomMovie = this._pickMovie.bind(this);

        this.state = {
            // TODO: Get from db!!
            randomCollection: [
                {
                    title: "The Shawshank Redemption",
                    rating: 9.2,
                    votes: 1530885,
                    year: 1994
                },
                {
                    title: "The Godfather",
                    rating: 9.2,
                    votes: 1049046,
                    year: 1972
                }
            ],
            pickedMovie: {}
        };
    }

    _pickMovie() {
        var choice = this.state.randomCollection[0]; // TODO: pick a random movie
        var title = choice.title;
        var rating = choice.rating;
        var year = choice.year;
        var votes = choice.votes;

        this.setState({
            pickedMovie: {
                title: title,
                rating: rating,
                votes: votes,
                year: year
            }
        })

    }

    componentDidMount() {
        this._pickMovie();
    }


    render() {
        return (
            <div>
                <div className="mui-container">
                    <div className="mui-row">
                        <div className="random-movie-content mui-text-center">
                            <div className="about">
                                <h1>{RandomMovie.toolTitle}</h1>
                            </div>
                            <div className="about-movie fade-in">
                                <h2>{this.state.pickedMovie.title}</h2>
                                <div className="mui-row">
                                    <div className="mui-col-md-6 mui-text-right">
                                        <img src="https://placehold.it/150x200" alt=""/>
                                    </div>
                                    <div className="stat-list mui-col-md-6 mui-text-left">
                                        <ul>
                                            <li>Rating: {this.state.pickedMovie.rating}</li>
                                            <li>Year: {this.state.pickedMovie.year}</li>
                                            <li>Votes on IMDB: {this.state.pickedMovie.votes}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="get-new-movie mui-row">
                                    <UIButton label="Give me another!" primary={true} onClick={this._handleRandomMovie}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

RandomMovie.toolTitle = "Random movie";
RandomMovie.toolDescription = "";
RandomMovie.toolMetaDescription = "";

module.exports = RandomMovie;