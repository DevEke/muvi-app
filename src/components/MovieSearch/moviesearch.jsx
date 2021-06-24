import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setFilter } from '../../actions/actions';
import { IoSearch } from 'react-icons/io5';
import './moviesearch.scss';

function MovieSearch(props) {
    return (
        <div className="search__container">
            <IoSearch className="icon"/>
            <input
                className="search-input"
                type="text"
                onChange={(e) => props.setFilter(e.target.value)}
                value={props.movieFilter}
                placeholder="Filter Movies"
            />
        </div>
    )
    
}

MovieSearch.propTypes = {
    onChange: PropTypes.func
}

export default connect(null, { setFilter })(MovieSearch);