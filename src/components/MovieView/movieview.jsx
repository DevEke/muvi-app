import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './movieview.scss';
import {IoArrowBack, IoHeartOutline } from 'react-icons/io5';
import axios from 'axios';


class MovieView extends Component {

    // Adds the selected movie to users favorites list in the database
    addtoFavorites(movie) {
        let token = localStorage.getItem('token');
        let url = "https://muvi-app.herokuapp.com/users/" + localStorage.getItem('user') + "/favorites/" + movie._id;
        axios.post(url, "", {
            headers: {Authorization: `Bearer ${token}`},
        }).then((response) => {
            console.log(response);
            this.props.alert("Movie added to favorites!");
        }).catch((error) => {
            this.props.alert("Sorry, We couldnt add your movie");
        });
    }

    

    render() {
        const { movie } = this.props;
        if (!movie) return null;

        return (
            <div className="movie-view"
            style={{backgroundImage: `url(${movie.BackdropImage})`}}>
                <div className="movie__info-container">
                    <Link to="/" className="movie-view-flex-start-btn">
                        <button className="movie-view-back-btn">
                            <IoArrowBack className="icon"/>
                            {/* <p>back</p> */}
                        </button>
                    </Link>
                    <div className="movie-info">
                        <h1 className="movie-view-title">{movie.Title}</h1>
                        <p>{new Date(movie.ReleaseDate).getFullYear()} - <Link className="genre-link" to={`/genres/${movie.Genre.Name}`} > {movie.Genre.Name}</Link></p>
                        <Link to={`/directors/${movie.Director.Name}`} className="text-link"><h2 className="movie-view-director">{movie.Director.Name}</h2></Link>
                        <p className="movie-view-description">{movie.Description}</p>
                        <button onClick={() => this.addtoFavorites(movie)} className="favorite-btn">
                            <IoHeartOutline className="icon"/>
                            {/* <p>Add to favorites</p> */}
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

MovieView.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImageURL: PropTypes.string.isRequired,
        BackdropImage: PropTypes.string.isRequired,
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Bio: PropTypes.string,
        }),
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string
        }),
    }).isRequired
};

export default MovieView;