import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import './updateview.scss';
import {IoAlertOutline, IoCheckmarkOutline } from 'react-icons/io5';

function UpdateView(props) {
    const [username, changeUsername] = useState('');
    const [password, changePassword] = useState('');
    const [email, changeEmail] = useState('');
    const [usernameValidation, checkUsernameValidation] = useState({});
    const [passwordValidation, checkPasswordValidation] = useState({});
    const [emailValidation, checkEmailValidation] = useState({});


    // Takes information enetered in the input and updates corresponding info in the database
    const updateAccount = (e) => {
        e.preventDefault();
        const isValid = formValidation();
        const url = 'https://muvi-app.herokuapp.com/users/' + localStorage.getItem("users");
        if (isValid) {
            axios.put(url, {
                Username: username,
                Password: password,
                Email: email
            }, { headers: {Authorization: "Bearer " + localStorage.getItem("token")}
        }).then((response) => {
            const data = response.data;
            localStorage.setItem("user", data.Username);
            window.open("/", "_self");
            alert('Account successfully updated.')
        }).catch((error) => {
            console.log(error);
        })
        }
    }

    // validates the form entry
    const formValidation = () => {
        const usernameValidation = {};
        const passwordValidation = {};
        const emailValidation = {};
        let isValid = true;
        if (username.trim().length < 5) {
            usernameValidation.usernameShort = "Username must be at least 5 characters long.";
            isValid = false;
        }
        if (password.trim().length < 1) {
            passwordValidation.passwordMissing = "You must enter a password.";
            isValid = false;
        }
        if (!email.includes(".") && !email.includes("@")) {
            emailValidation.emailInvalid = "Enter a valid email address.";
            isValid = false;
        }

        checkUsernameValidation(usernameValidation);
        checkPasswordValidation(passwordValidation);
        checkEmailValidation(emailValidation);
        return isValid;
    };

    return (
        <div className="update-account-container">
            <form>
                <p>Update your account information</p>
                <div className="input__container">
                    <label className="label" htmlFor="username">New Username</label>
                    <input id="username" placeholder="Enter New or Current Username" type="text" value={username} onChange={e => changeUsername(e.target.value)}/>
                    {Object.keys(usernameValidation).map((key) => {
                        return (
                            <div className="validation-error" key={key}>
                                <IoAlertOutline className="icon"/>
                                <p>{usernameValidation[key]}</p>
                            </div>
                        );
                    })}
                </div>
                <div className="input__container">
                    <label className="label" htmlFor="password">New Password</label>
                    <input id="password" placeholder="Enter New or Current Password" type="password" value={password} onChange={e => changePassword(e.target.value)}/>
                    {Object.keys(passwordValidation).map((key) => {
                        return (
                            <div className="validation-error" key={key}>
                                <IoAlertOutline className="icon"/>
                                <p>{passwordValidation[key]}</p>
                            </div>
                        );
                    })}
                </div>
                <div className="input__container">
                    <label className="label" htmlFor="email">New Email</label>
                    <input id="email" placeholder="Enter New or Current Email" type="email" value={email} onChange={e => changeEmail(e.target.value)}/>
                    {Object.keys(emailValidation).map((key) => {
                        return (
                            <div className="validation-error" key={key}>
                                <IoAlertOutline className="icon"/>
                                <p>{emailValidation[key]}</p>
                            </div>
                        );
                    })}
                </div>
                <div className="aligner">
                    <button className="update-account-btn" type="button" onClick={updateAccount}>Accept Changes</button>
                    <IoCheckmarkOutline className="icon"/>
                </div>
                <Link className="aligner" to="/users/:userId"><button  className="cancel-update-btn">Cancel Update</button></Link>
            </form>
        </div>
    )
}

UpdateView.propTypes = {
    onChange: PropTypes.func,
    onClick: PropTypes.func
}

export default UpdateView;