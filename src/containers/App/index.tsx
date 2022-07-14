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
    const [user, setUser] = useState({});
    let history = useHistory();
    const onLogin = async (user: string, pwd: string) => {
        try {
            const u: UserCredential = await signInWithEmailAndPassword(
                auth,
                user,
                pwd
            )
            console.log(user, pwd)
            console.log(u)
            return <Redirect to='admin' />
        } catch (error: any) {
            console.log(error.message)
        }
    }
    onAuthStateChanged(auth, (currentUser: any) => {
        setUser(currentUser)
    })
    const onLogout = async () => {
        await signOut(auth);
        console.log('user')
    };

    return (
        <Router>
            <Provider store={store}>
                <Switch>
                    <Route path='/sdas' exact={true}>
                        <NotFound />
                    </Route>
                    <Route path='/login'>
                        <LoginPage onLogin={onLogin} user={user} />
                    </Route>
                    <LayoutPage onLogout={onLogout} user={user} />
                </Switch>
            </Provider>
        </Router>
    );
}

export default App;