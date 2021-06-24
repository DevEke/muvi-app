//Action Types

export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';
export const SET_USER = 'SET_USER';
export const SET_USER_USERNAME = 'SET_USER_USERNAME';
export const SET_USER_PASSWORD = 'SET_USER_PASSWORD';
export const SET_USER_EMAIL = 'SET_USER_EMAIL';
export const SET_USER_FAVORITES = 'SET_USER_FAVORITES';

//Action Creators

// Sets Movies in the state
export const setMovies = (value) => {
    return async function(dispatch, getState) {
        dispatch({
            type: SET_MOVIES,
            value
        })
    }
}

// Sets filter in the search input
export const setFilter = (value) => {
    return async function(dispatch, getState) {
        dispatch({
            type: SET_FILTER,
            value
        })
    }
}


// Sets the user after login
export const setUser = (value) => {
    return async function(dispatch, getState) {
        dispatch({
            type: SET_USER,
            value
        })
    }
}