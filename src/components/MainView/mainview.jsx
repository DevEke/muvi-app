import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { setMovies, setUser } from '../../actions/actions';
import MoviesList from '../MoviesList/movieslist';
import MovieView from '../MovieView/movieview';
import LoginView from '../LoginView/loginview';
import RegisterView from '../RegisterView/registerview';
import DirectorView from '../DirectorView/directorview';
import GenreView from '../GenreView/genreview';
import ProfileView from '../ProfileView/profileview';
import UpdateView from '../UpdateView/updateview';
import { IoPersonCircleOutline } from 'react-icons/io5';
import logo from '../../img/logo.svg';
import './mainview.scss';
import Alert from '../Alert/alert';



class MainView extends Component {
    constructor() {
        super();

        this.state = {
            alertMessage: ''
        }
    }

    setAlert(x) {
        this.setState({
            alertMessage: x
        })
    }

    // When component mounts, identifies the user with the access token from the local storage and retrieves movies if it is valid
    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.props.setUser(localStorage.getItem('user'));
            this.getMovies(accessToken);
        }
    }

    // When the user is logged in, set the user in state, then set the local storage with their information and retrieves the movies from the database
    onLoggedIn(authData) {
        console.log(authData);
        this.props.setUser(authData.user.Username);
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }

    // Gets the movies from the database, and sets the movies
    getMovies(token) {
        axios.get('https://muvi-app.herokuapp.com/movies', {
            headers: {Authorization: `Bearer ${token}`}
        })
        .then((response) => {
            this.props.setMovies(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    // When the user signs out, clears local storage and removes user from state
    onSignOut() {
        localStorage.clear();
        this.props.setUser(null);
    }

    render() {
        const { movie, movies, user } = this.props;
        const { alertMessage } = this.state;


        return (
            <Router>
                <div className="main-view">
                    { alertMessage !== "" ? <Alert closemodal={() => this.setAlert('')} message={alertMessage}/> : null }            
                    <div className="nav">
                        <img src={logo} alt="site logo"/>
                        <div className="nav-button-flex"> 
                            <Link className="account-btn" to="/users/:userId">
                                    <IoPersonCircleOutline className="icon"/>
                            </Link>
                            <Link className="sign-out-btn" to="/">
                                <button onClick={() => this.onSignOut()} className="signout-btn">Sign Out</button>
                            </Link>
                        </div>
                    </div>
                    <div className="movie-grid">
                        <Route exact path="/" render={() => 
                            { if (!user) return <LoginView alert={x => this.setAlert(x)} onLoggedIn={user => this.onLoggedIn(user)}/>;
                            return <MoviesList movies={movies}/>;
                            }
                        }/>
                        <Route path="/movies/:movieId" render={({match}) => <MovieView alert={x => this.setAlert(x)} movie={movies.find(movie => movie._id === match.params.movieId)}/>}/>
                        <Route path="/register" render={() => <RegisterView alert={x => this.setAlert(x)} onLoggedIn={user => this.onLoggedIn(user)} />}/>
                        <Route path="/directors/:name" render={({match}) => { 
                            if (!movies) return <div className="main-view"/>;
                            return <DirectorView director={movies.find(movie => movie.Director.Name === match.params.name)} movies={movies}/>}}
                        />
                        <Route path="/genres/:name" render={({match}) => {
                            if (!movies) return <div className="main-view"/>;
                            return <GenreView genre={movies.find(movie => movie.Genre.Name === match.params.name)} movies={movies}/>}}
                        />
                        <Route path="/users/:userId" render={() => {
                            return <ProfileView alert={x => this.setAlert(x)} movies={movies} movie={movie}/>}}
                        />
                        <Route path="/update/:userId" render={() => {
                            return <UpdateView/>}}
                        />
                    </div>         
                </div>
            </Router>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        movies: state.movies,
        user: state.user
    }
}

MainView.propTypes = {
    user: PropTypes.string,
    movies: PropTypes.arrayOf(
        PropTypes.shape({
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
            })
        })
    ),
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImageURL: PropTypes.string.isRequired,
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Bio: PropTypes.string,
        }),
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string
        })
    }) 
};

export default connect(mapStateToProps, { setMovies, setUser })(MainView);