import React from 'react';
import {Switch, Route, BrowserRouter as Router, Redirect} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Login from './Login/Login';
import Chat from './components/Chat/Chat';

function App() {

    return (
        <div className='app'>
            <Router>
                <Switch>
                    <Redirect exact from='/' to='/login' />
                    <Route exact path='/login' component={Login} />
                    <PrivateRoute exact path="/chat" component={Chat} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
