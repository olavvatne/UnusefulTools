/**
 * Created by Torgeir on 13.10.2015.
 */

import React from 'react';
import reqwest from 'reqwest';
import UIButton from './mui/UIButton.js';

class RandomMovie extends React.Component {

    constructor() {
        super();

        this._handleRandomMovie = this._pickMovie.bind(this);

        this.state = {
            movies: [],
            movieIndex: -1,
        };
    }

    _pickMovie() {

        if (this.state.movieIndex < this.state.movies.length) {
            var index = this.state.movieIndex + 1;
        }

        // get new movies if index is near end
        var length = this.state.movies.length;
        if (length > 0 && index > length - 3) {
            this._retrieveMoreMovies();
        }

        this.setState({
            movieIndex: index
        });

    }

    _retrieveMoreMovies() {
        reqwest({
            url: "/api/v1/random-movies",
            type: 'json',
            contentType: 'application/json',
            method: 'get',
            success: (success) => {
                var currentMovies = this.state.movies;
                currentMovies.push.apply(currentMovies, success);
                this.setState({
                    movies: currentMovies
                })
            }
        });
    }

    componentWillMount() {
        var movies = JSON.parse(this.props.data);
        this.setState({
            movies: movies
        });
        this._pickMovie()
    }

    render() {

        var movie = this.state.movies[this.state.movieIndex];

        if (movie.Poster == 'N/A') {
            movie.Poster = "/images/movies/no_poster.png";
        }

        var imdbUrl = "http://www.imdb.com/title/" + movie.imdbID + "/";

        return (
            <div>
                <div className="mui-container">
                    <div className="mui-row">
                        <div className="random-movie-content mui-text-center">
                            <div className="about-tool">
                                <h1>{RandomMovie.toolTitle}</h1>
                                <p>{RandomMovie.toolDescription}</p>
                            </div>
                            <div className="about-movie fade-in">
                                <div className="mui-row">
                                    <div className="mui-col-md-5 poster-right-aligned">
                                        <img src={movie.Poster} alt="Movie poster"/>
                                    </div>
                                    <div className="mui-col-md-6" id="movie-facts">
                                        <table width="100%">
                                            <tr>
                                                <td id="movie-title" colSpan="3"><h2>{movie.Title}</h2></td>
                                            </tr>
                                            <tr>
                                                <td className="short-cell">IMDB rating: {movie.imdbRating}</td>
                                                <td>{movie.Genre}</td>
                                                <td className="short-cell">{movie.Year}</td>
                                            </tr>
                                            <tr>
                                                <td className="short-cell">Metascore: {movie.Metascore}</td>
                                                <td>{movie.Language}</td>
                                                <td className="short-cell">{movie.Runtime}</td>
                                            </tr>
                                            <tr>
                                                <td id="imdb-link" colSpan="3"><a href={imdbUrl} target="_blank">View on IMDB</a></td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="get-new-movie mui-row jumbotron">
                                    <UIButton label="Give me another!" primary={true} onClick={this._handleRandomMovie}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

RandomMovie.toolTitle = "Pick me a movie!";
RandomMovie.toolDescription = "This tool will suggest a movie with IMDB rating over 7.0, effectively eliminating the hassle of picking a good movie to watch. ";
RandomMovie.toolMetaDescription = "Random movie picker. Unsure what good movie to watch? This tool will suggest a movie with IMDB rating over 7.0. ";

module.exports = RandomMovie;