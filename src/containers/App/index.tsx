import React, { useState } from 'react';
import LayoutPage from '../../layout/LayoutPage';
import { BrowserRouter as Router, Redirect, Route, Switch, useHistory } from "react-router-dom";
import LoginPage from '../../features/Auth/Login/index';
import NotFound from '../../pages/NotFound';
import { signInWithEmailAndPassword, onAuthStateChanged, UserCredential, signOut, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../config/firebase'
import '../../App.css';
import '../../App.less'
import { Provider } from 'react-redux';
import store from '../../store';


const App = () => {

    return (
        <Router>
            <Provider store={store}>
                <Switch>
                    <Route path='/sdas' exact={true}>
                        <NotFound />
                    </Route>
                    <Route path='/login'>
                        <LoginPage />
                    </Route>
                    <LayoutPage />
                </Switch>
            </Provider>
        </Router>
    );
}

export default App;