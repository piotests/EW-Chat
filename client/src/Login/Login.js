import React, {useEffect, useState} from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import Auth from './Auth';
import LocalStorage from '../components/Chat/Helpers/LocalStorage';
import {SOCKET_SERVER_URL, RANDOM_IMAGES_API, USER} from '../components/Config/Config';

import './Login.scss';

const Login = (props) => {

    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const isAuth = Auth.isAuthenticated();

    useEffect(() => {
        // redirect back to chat
        if (isAuth) {
            props.history.push('/chat');
        }
        LocalStorage.clear();
     });
        
    const handleSubmitClick = (e) => {
        e.preventDefault();

        if (name.trim().length < 2) {
            setError('Please enter name. ( minimum 2 characters )');
        } else {
            const randomImage= Math.floor(100 + Math.random() * 9000);
            const randomRoomNumber = Math.floor(10 + Math.random() * 9000);
            const userObject = {
                id: '',
                room: '',
                name: name.trim(),
                picture: `${RANDOM_IMAGES_API}/${ randomImage }.jpg`,
                roomNumber: randomRoomNumber,
            };
            joinUser(userObject);
        }
    };

    const joinUser = (userObject) => {
        axios.post(`${SOCKET_SERVER_URL}/users/create`, userObject)
                .then((res) => {
                    if (res.data.error) {
                        alert(res.data.error); 
                        return;
                    }
                    res.data.isLoggedIn = true;
                    console.log('login',res.data);
                    // For Demo - store the user in localStorage
                    LocalStorage.setItem('user', res.data);
                    Auth.login(() => {
                        props.history.push('/chat');
                    });

                }).catch((error) => {
                    setError('Something went wrong. Please try again later.');
                });
    };


    return (
        <div className='login'>
            <div className='item'>
                <h2 className='login-header'>Log in</h2>
                <form className='login-container' autoComplete='off'>
                    <p>
                        <label htmlFor='InputUserName'>User name</label>
                        <input 
                            type='text' 
                            id='name' 
                            placeholder='Enter Name' 
                            value={name} 
                            onChange={ (e) => setName(e.target.value) } 
                        />
                        <span className={ error.length ? 'error d-block' : 'error d-hide' }>{error}</span>
                    </p>
                    <p>
                        <input 
                            type='submit' 
                            value='Log in' 
                            onClick={handleSubmitClick} 
                        />
                    </p>
                </form>
            </div>
        </div>
    );
};

export default withRouter(Login);
