import React from 'react';
import LayoutPage from '../../layout/LayoutPage';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginPage from '../../pages/LoginPage/index';
import NotFound from '../../pages/NotFound';
import ForgetPassword from '../../components/Login/ForgetPassword';
import '../../App.css';
import '../../App.less'

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/sdas'>
                    <NotFound />
                </Route>
                <Route path="/login" >
                    <LoginPage />
                </Route>
                <Route path="/forgetpassword">
                    <ForgetPassword />
                </Route>

                <LayoutPage />
            </Switch>
        </BrowserRouter>
    );
}

export default App;